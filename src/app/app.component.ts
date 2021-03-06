import {
  Component, HostBinding, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, OnInit,
  ViewChild, ElementRef
} from '@angular/core';
import {TdLayoutComponent, TdMediaService, TdLoadingService, TdDialogService} from '@covalent/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {environment} from '../environments/environment';

import {AuthenticationService} from './services/authentication.service';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {LoginDialogComponent} from './popups/login-dialog/login-dialog.component';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import {NotificationService} from './services/notification.service';
import {NotificationMessage} from './models/notification.message';
import {Subscription} from 'rxjs/Subscription';
import {SelectBasestationDialogComponent} from './popups/select-basestation-dialog/select-basestation-dialog.component';
import {WaypointsService} from "./services/waypoints.service";
import {IWaypoint} from "./models/waypoint";


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit, OnInit {

  @ViewChild('layout', {read: ElementRef}) layout: ElementRef;

  // TODO - This will go in the waypoints.component later
  waypointSubscription: Subscription;

  waypoints: IWaypoint[] = [];

  selectroute = '';
  selectedglider = '';
  selectedmission = '';
  selecteddeploy = '';
  selectedplan = '';


  routes: Object[] = [{
    icon: 'home',
    route: '.',
    title: 'Glider Terminal',
  }, {
    icon: 'library_books',
    route: '.',
    title: 'Mission Planner',
  }, {
    icon: 'color_lens',
    route: '.',
    title: 'Data Viewer',
  }, {
    icon: 'view_quilt',
    route: '.',
    title: 'Statistics',
  }, {
    icon: 'picture_in_picture',
    route: '.',
    title: 'Admin',
  },
    {
      icon: 'local_airport',
      route: '.',
      title: 'Assets',
    }

  ];
  usermenu: Object[] = [{
    icon: 'swap_horiz',
    route: '.',
    title: 'Switch account',
  }, {
    icon: 'tune',
    route: '.',
    title: 'Account settings',
  }, {
    icon: 'exit_to_app',
    route: '.',
    title: 'Sign out',
  },
  ];

  chatUsers: Object[] = [
    {id: 0, name: 'stephen.fraser@sams.ac.uk'},
    {id: 1, name: 'kar@bodc.ac.uk'},
    {id: 2, name: 'owanes@noc.ac.uk'},
    {id: 3, name: 'ashmorr@noc.ac.uk'},
    {id: 4, name: 'estelle.dumont@sams.ac.uk'},
    {id: 5, name: 'alexk@bodc.ac.uk'},
    {id: 6, name: 'paola.arce@sams.ac.uk'},
    {id: 7, name: 'allore@noc.ac.uk'}
  ];


  navmenu = [{
    icon: 'flight_land',
    route: '.',
    title: 'Bellatrix',
    description: 'SG123 - Kongsberg-G2',
    type: 1,
    deployments: [1, 2, 6]
  }, {
    icon: 'local_airport',
    route: '.',
    title: 'Canopus',
    description: 'SG345 - UoW-G2',
    type: 2,
    deployments: [4, 2, 6]
  }, {
    icon: 'flight_land',
    route: '.',
    title: 'Talisker',
    description: 'SG453 - Kongsberg-G2',
    type: 1,
    deployments: [1, 3]
  }, {
    icon: 'local_airport',
    route: '.',
    title: 'Denebola',
    description: 'SG545 - Teledyne-M1',
    type: 3,
    deployments: [2, 5]
  }, {
    icon: 'flight_land',
    route: '.',
    title: 'Scapa',
    description: 'SG163 - Waveglider',
    type: 4,
    deployments: [4, 5]
  }, {
    icon: 'flight_land',
    route: '.',
    title: 'Jura',
    description: 'SG163 - UoW-G2',
    type: 2,
    deployments: [3, 4, 7]
  }, {
    icon: 'flight_land',
    route: '.',
    title: 'Eltanin',
    description: 'SG163 - Teledyne-M1',
    type: 3,
    deployments: [2, 3, 4, 7]
  }, {
    icon: 'local_airport',
    route: '.',
    title: 'Ardbeg',
    description: 'SG163 - UoW-G2',
    type: 2,
    deployments: [1, 2, 5, 7]
  }, {
    icon: 'flight_land',
    route: '.',
    title: 'Aldebaran',
    description: 'SG155 - UoW-G2',
    type: 2,
    deployments: [3, 6, 7]
  }, {
    icon: 'flight_land',
    route: '.',
    title: 'Mersak',
    description: 'SG113 - Teledyne-M1',
    type: 3,
    deployments: [2, 3, 5, 7]
  }, {
    icon: 'local_airport',
    route: '.',
    title: 'Rigel',
    description: 'unit_345 - UoW-G2',
    type: 2,
    deployments: [1, 3, 5, 7]
  }, {
    icon: 'flight_land',
    route: '.',
    title: 'Alnilalm',
    description: 'SG183 - Teledyne-M1',
    type: 3,
    deployments: [2, 3, 5, 6]
  }
  ];

  tabs: Object[] = [
    {title: 'Mission', x: 'A form and stuff to select missions and plan stuff here'},
    {title: 'Log', x: 'A log of events relating to the glider'}
  ];

  missions: Object[] = [
    {id: 1, name: 'CalibFlight'},
    {id: 2, name: 'OutwardBound'},
    {id: 3, name: 'ScienceRun-1'},
    {id: 4, name: 'ScienceRun-2a'},
    {id: 5, name: 'ScienceRun-2b'}
  ];

  plans: Object[] = [
    {id: 1, value: 'Launch'},
    {id: 2, value: 'Dives 2-4'},
    {id: 3, value: 'Dives 5-12'},
    {id: 4, value: 'Calib Dive-1'},
    {id: 5, value: 'Science d13-24'}
  ];

  deployments: Object[] = [
    {id: 1, name: 'EEL-6'},
    {id: 2, name: 'MASSMO-3'},
    {id: 3, name: 'OSNAP-9'},
    {id: 4, name: 'Alter-ECO'},
    {id: 5, name: 'Calib-2'},
    {id: 6, name: 'Mermeed-1'},
    {id: 7, name: 'BoBBle'}
  ];

  types: Object[] = [
    {id: 1, name: 'Kongsberg G2'},
    {id: 2, name: 'UoW G2'},
    {id: 3, name: 'Teledyne-M1'},
    {id: 4, name: 'Waveglider'}
  ];

  notifications: NotificationMessage[] = [];

  filteredGliders = [];

  recentGliders = [];

  recordRecentGliders = [];

  favoriteGliders = [];

  noDisplayDeployments = true;

  noDisplayTypes = true;

  noNewMission = true;

  noNewCommit = true;

  newMissionName;

  newCommitMessage;


  loginName = 'SNF';
  loginEmail = 'snf@sams';

  oceanidsUserName = '';
  oceanidsAccessToken = '';
  oceanidsTokenExpires: any;

  // related to login
  accessToken;
  refreshToken;
  userName;
  expiresAt;
  nextRefresh;
  countDown = 0;
  refreshCount = 0;

  hostEnv = '';

  timer;


  notificationSubscription: Subscription;

  constructor(private _changeDetectorRef: ChangeDetectorRef,
              public media: TdMediaService,
              private authService: AuthenticationService,
              private dialogFactory: MatDialog,
              private dialogService: TdDialogService,
              private loadingService: TdLoadingService,
              private notificationService: NotificationService,
              private waypointsService: WaypointsService,
              private toaster: MatSnackBar) {
    this.notificationSubscription = this.notificationService.getMessage().subscribe(message => this.handleNotification(message));
    this.waypointSubscription = this.waypointsService.getWaypoint().subscribe(waypoint => this.handleWaypoint(waypoint));
  }

  ngOnInit() {


    this.filteredGliders = this.navmenu;

    this.hostEnv = environment.host;

    console.log('OnInit:: Hosted: ' + this.hostEnv);

    // if we are running locally (hostEnv===local) then do local login - need loginform
    // if we are running dev deployed (hostEnv===dev) then redirect to loginapp


    const c_accessToken = localStorage.getItem(AuthenticationService.OCEANIDS_ACCESS_TOKEN);


    if (c_accessToken) {

      // log this value it may be what we are looking for...
      console.log('OnInit:: read value of access_token: [' + c_accessToken + '] - must be logged in already');

      // set items to display on UI
      this.accessToken = c_accessToken;
      this.expiresAt = localStorage.getItem(AuthenticationService.OCEANIDS_TOKEN_EXPIRY);
      this.refreshToken = localStorage.getItem(AuthenticationService.OCEANIDS_REFRESH_TOKEN);
      this.loginEmail = localStorage.getItem(AuthenticationService.OCEANIDS_USER);
      // for now we dont have this - get from userreg api
      this.loginName = localStorage.getItem(AuthenticationService.OCEANIDS_USER);

      // these are temp - to display on ui tabs for no good reason
      this.oceanidsUserName = localStorage.getItem(AuthenticationService.OCEANIDS_USER);
      this.oceanidsAccessToken = localStorage.getItem(AuthenticationService.OCEANIDS_ACCESS_TOKEN);
      this.oceanidsTokenExpires = localStorage.getItem(AuthenticationService.OCEANIDS_TOKEN_EXPIRY);

      const m_expAtTime: Moment = moment.parseZone(this.expiresAt);
      const m_now: Moment = moment();

      // calc time to go - may be negative: If timeDiff is +ve we are OVERRUN, else time to go until expiry

      const timeDiff = m_now.diff(m_expAtTime, 'seconds');

      if (timeDiff >= 0) {
        console.log('OnInit:: Access token expired ' + (timeDiff) + ' secs ago - attempting auto-login...');

        // cant just log in as we dont have the password - assuming its the same user.....

        this.openLogin();

      } else {
        console.log('OnInit:: Access token still valid for: ' + (-timeDiff) + ' secs - starting auto-refresh using exisiting refresh token...');

        this.refresh(true);

      }


    } else {
      console.log('OnInit:: accessToken is NOT defined - either redirect to login page or get one ourselves if local testing');

      if (this.hostEnv === 'local') {
        console.log('OnInit:: Looks like LOCAL/TESTING mode - show local login form...');

        this.openLogin();

      } else if (this.hostEnv === 'dev') {
        console.log('OnInit:: Looks like DEVELOPMENT/TESTING mode - redirect to loginapp...');

        // OR document.open('https://c2-pilot.test.oceanids.ml/login/');

        document.location.href = 'https://c2-pilot.test.oceanids.ml/login/';

      } else {
        // blimey we might be in production mode  !
        console.log('OnInit:: Looks like PRODUCTION mode - redirect to loginapp...');
      }


    }

    // setup countdown timer
    /*setInterval(() => {
      if (this.countDown >= 2) {
        this.countDown -= 2;
      }
    }, 2000);*/


    Observable.interval(2000).subscribe(
      tick => {
        if (this.countDown >= 2) {
          this.countDown -= 2;
        }
      }
    );


  }

  ngAfterViewInit() {

    console.log('Found layout object: ');
    console.log(this.layout);

    // broadcast to all listener observables when loading the page
    setTimeout(() => { // workaround since MatSidenav has issues redrawing at the beggining
      this.media.broadcast();
      this._changeDetectorRef.detectChanges();
    });
  }

  /**
   * Handle receipt of a message from the notification service.
   * @param {NotificationMessage} message The notification message.
   */
  handleNotification(message: NotificationMessage) {
    this.notifications.push(message);
  }

  /**
   * Handle receipt of a waypoint from the waypoints service.
   * @param {IWaypoint} waypoint The new waypoint.
   */
  handleWaypoint(waypoint: IWaypoint) {
    console.log('AppCmp:: handleWpt: ' + waypoint);
    this.waypoints.push(waypoint);
  }

// select off mission dropdown
  selmission(m) {
    console.log('selmission: ' + m.title);
    this.selectedmission = m.title;
  }

  // select off app sidenav
  selroute(thing) {
    console.log('selapp: ' + thing.title);
    this.selectroute = thing.title;
    this.selectedmission = '';
  }

  // select off
  selglider(g) {
    console.log('selglider: ' + g.title);
    this.selectedglider = g.title;
    this.selRecentGlider(g);
  }

  selFavoriteGlider(g) {
    this.favoriteGliders.push(g);
  }

  /**
   * Select the specified glider as a recently-viewed one.
   * @param g The glider.
   */
  selRecentGlider(g) {

    // check its not already in the list...
    if (!this.recentGliders.includes(g)) {

      this.recentGliders.push(g);

      // this is how we store the gliders in localstorage -
      // TODO: object = gliderSvc.addGliderToRecents(g): array to dump in LS
      // TODO: localStorage.setItem('recent', JSON.stringify(object)


      this.recordRecentGliders.push({time: new Date(), glider: g.title});
      // this should happen at logout or if we dont logout just jump elsewhere then needs doing now...
      localStorage.setItem('recents', JSON.stringify(this.recordRecentGliders));
    }
  }

  checkpass() {
    const spw = btoa('kar');
    console.log('u:p=[' + spw + ']');
  }

  goaway() {
    document.location.href = 'https://mars.noc.ac.uk';
  }

  addNewMission() {

    this.noNewMission = !this.noNewMission;

  }

  createMission() {
    // extract the name from the form field and send to backend
  }


  addNewCommit() {

    this.noNewCommit = !this.noNewCommit;

  }

  extraCommitMessage() {

    // popup a dialog to capture a longer and maybe structured commit message
    //this.toaster.open('A dialog to capture a longer and structured commit message', 'Dismiss', {duration: 8000});

    this.dialogService.openPrompt({
      message: 'Please enter a detailed commit message - this will be added to the mission plan-log.',
      disableClose: false, // defaults to false
      title: 'Extended commit message',
      value: 'commit message',
      cancelButton: 'Cancel',
      acceptButton: 'Accept',
    }).afterClosed().subscribe((newValue: string) => {
      if (newValue) {
        this.toaster.open(newValue, 'Dismiss', {duration: 8000});
        this.newCommitMessage = '';
        this.noNewCommit = true;
      } else {
        // DO SOMETHING ELSE
      }
    });


  }

  commitVersion() {

    this.loadingService.register('nvc');

    Observable.interval(5000).take(1).subscribe(
      done => {
        this.loadingService.resolve('nvc');
        this.newCommitMessage = '';
        this.noNewCommit = true;

        console.log('commit ok...');
      }
    );


    // extract commit message from form field and send to backend


  }

  applyFilter(filter) {
    console.log('Apply filter: ' + filter);
    const ifilter = +filter;

    switch (ifilter) {
      case 1:
        // Display ALL gliders
        this.noDisplayTypes = true;
        this.noDisplayDeployments = true;
        this.filteredGliders = this.navmenu;
        break;
      case 2:
        // Select by deployment group
        this.noDisplayDeployments = false;
        this.noDisplayTypes = true;
        // filter action occurs on select deployment from selector
        break;
      case 3:
        // Display Favorite gliders
        break;
      case 4:
        // Display Recent gliders
        this.noDisplayDeployments = true;
        this.noDisplayTypes = true;
        this.filteredGliders = this.recentGliders;
        break;
      case 5:
        // Select by glider type
        this.noDisplayTypes = false;
        this.noDisplayDeployments = true;
        // TODO - filter action occurs on select type from selector
        break;
      default: // there are no others !
        this.noDisplayDeployments = true;
        this.noDisplayTypes = true;
    }

  }

  onDeploymentChanged(value) {
    console.log('Deployment changed: ');
    const id: number = +value;
    console.log(id);

    // find the glider which have id in their deployments
    this.filteredGliders = this.navmenu.filter(g => g.deployments.includes(id));

    console.log(this.filteredGliders);

  }

  onTypeChanged(value) {
    console.log('Type changed: ');
    const id: number = +value;
    console.log(id);

    // find the glider which have id as type
    this.filteredGliders = this.navmenu.filter(g => g.type === id);

    console.log(this.filteredGliders);

  }

  /**
   * Open a local login dialog. Login to gateway and update local access info. Start auto refresh.
   */
  openLogin() {

    const loginDialog = this.dialogFactory.open(LoginDialogComponent,
      {backdropClass: 'modalbd', hasBackdrop: true, disableClose: true});

    // handle the login results - first check they are not rubbish
    loginDialog.afterClosed().subscribe(
      model => {
        console.log('App::LoginCLosedObservable:: Got data...');
        console.log(model);

        // close the layout here - how do we get a reference to the element
        this.layout.nativeElement.setAttribute('opened', false);

        this.login(model.userName, model.password);


      }
    );

  }

  /**
   * Open a base-station selection dialog.
   */
  selectBaseStation() {
    const baseStationSelectionDialog = this.dialogFactory.open(SelectBasestationDialogComponent);

    baseStationSelectionDialog.afterClosed().subscribe(
      selection => {

        this.toaster.open('Selected base-station: ' + selection, 'Dismiss', {duration: 4000});

      }
    );
  }


  /**
   * Login using the stored user info and credentials.
   */
  login(userName: string, password: string) {
    this.authService.login(userName, password)
      .subscribe(
        auth => {
          console.log('Login successfull...');
          // extract useful data
          const c_accessToken = auth.access_token;
          const c_refreshToken = auth.refresh_token;
          const c_expiresIn = auth.expires_in;

          // fill local storage
          localStorage.setItem(AuthenticationService.OCEANIDS_ACCESS_TOKEN, c_accessToken);
          localStorage.setItem(AuthenticationService.OCEANIDS_REFRESH_TOKEN, c_refreshToken);
          localStorage.setItem(AuthenticationService.APP_TOKEN_EXPIRES_IN, c_expiresIn);
          localStorage.setItem(AuthenticationService.OCEANIDS_USER, userName);

          // compute expiry time as now plus expires in
          const mnow = moment();
          const m_expiryTime = mnow.add(+c_expiresIn, 'seconds');

          localStorage.setItem(AuthenticationService.OCEANIDS_TOKEN_EXPIRY, m_expiryTime.format());

          console.log('Access token:  ' + c_accessToken);
          console.log('  expires in:  ' + c_expiresIn + ' secs');
          console.log('Refresh token: ' + c_refreshToken);

          // display variables
          this.userName = localStorage.getItem(AuthenticationService.OCEANIDS_USER);
          this.accessToken = c_accessToken;
          this.refreshToken = c_refreshToken;
          this.expiresAt = m_expiryTime.format();

          this.notificationService.sendSuccess('Logged in ok', 'LoginDialog');

        },
        error => {
          console.log('Error logging in...');
          console.log(error);
          // this needs to get to notifyService or to
          this.notificationService.sendError('Error logging in', 'Login', error.status);

        }
      );
  }

  /**
   * Refresh the login access tokens.
   * @param {boolean} auto True if this should automatically refresh at intervals - normally true.
   */
  refresh(auto: boolean) {

    console.log('Refresh auto=' + auto);

    this.authService.refresh()
      .subscribe(
        auth => {
          const c_accessToken = auth.access_token;
          const c_expiresIn = auth.expires_in;
          const c_refreshToken = auth.refresh_token;


          localStorage.setItem(AuthenticationService.OCEANIDS_ACCESS_TOKEN, c_accessToken);
          localStorage.setItem(AuthenticationService.OCEANIDS_REFRESH_TOKEN, c_refreshToken);
          localStorage.setItem(AuthenticationService.APP_TOKEN_EXPIRES_IN, c_expiresIn);

          // compute expiry time as now plus expires in
          const mnow = moment();
          const m_expiryTime = mnow.add(+c_expiresIn, 'seconds');
          const timeToGo = +c_expiresIn - 2700; // secs

          localStorage.setItem(AuthenticationService.OCEANIDS_TOKEN_EXPIRY, m_expiryTime.format());

          console.log('Access token:  ' + c_accessToken);
          console.log('  expires in:  ' + c_expiresIn + ' secs');
          console.log('Refresh token: ' + c_refreshToken);


          // display variables
          this.userName = localStorage.getItem(AuthenticationService.OCEANIDS_USER);
          this.accessToken = c_accessToken;
          this.refreshToken = c_refreshToken;
          this.expiresAt = m_expiryTime.format();
          this.refreshCount += 1;

          // if this is an auto refresh we will wait until 60 sec before the timeout then make the call
          if (auto === true) {

            // calc time of next refresh..
            const c_refreshTime: Moment = moment().add(timeToGo, 'seconds');
            console.log('Waiting for ' + timeToGo + ' sec before refreshing again at: ' + c_refreshTime.format());
            this.nextRefresh = c_refreshTime.format();

            this.countDown = timeToGo;

            // TODO - we should really clear any existing timers here
            // clearTimeout(this.timer);

            this.timer = setTimeout(() => {
              this.refresh(true);
            }, timeToGo * 1000);
          }

        },
        error => {
          console.log('Error refreshing token...');
          console.log(error);
        }
      );


  }

}
