import {Component, HostBinding, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, OnInit} from '@angular/core';
import {TdMediaService} from '@covalent/core';
import * as moment from 'moment';
import {Moment} from 'moment';

import {AuthenticationService} from './authentication.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit, OnInit {

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
    {title: 'Charts', x: 'Engineering data charts etc'},
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

  filteredGliders = [];

  noDisplayDeployments = true;

  noDisplayTypes = true;

  noNewMission = true;

  newMissionName;

  loginName: string = 'SNF';
  loginEmail: string = 'snf@sams';

  oceanidsUserName: string = '';
  oceanidsAccessToken: string = '';
  oceanidsTokenExpires: any;

  // related to login
  accessToken;
  refreshToken;
  userName;
  expiresAt;
  nextRefresh;
  countDown = 0;
  refreshCount = 0;

  constructor(private _changeDetectorRef: ChangeDetectorRef,
              public media: TdMediaService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {



    this.filteredGliders = this.navmenu;



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
      this.loginName = localStorage.getItem(AuthenticationService.OCEANIDS_USER);;

      // these are temp - to display on ui tabs for no good reason
      this.oceanidsUserName = localStorage.getItem(AuthenticationService.OCEANIDS_USER);
      this.oceanidsAccessToken = localStorage.getItem(AuthenticationService.OCEANIDS_ACCESS_TOKEN);
      this.oceanidsTokenExpires = localStorage.getItem(AuthenticationService.OCEANIDS_TOKEN_EXPIRY);

      const m_expAtTime: Moment = moment.parseZone(this.expiresAt);
      const m_now: Moment = moment();

      // calc time to go - may be negative: If timeDiff is +ve we are OVERRUN, else time to go until expiry

      const timeDiff = m_now.diff(m_expAtTime, 'seconds');

      if (timeDiff >= 0) {
        console.log('OnInit:: Access token expired ' + timeDiff + ' secs ago - attempting auto-login...');
      } else {
        console.log('OnInit:: Access token still valid for: ' + timeDiff + ' secs - starting auto-refresh using exisiting refresh token...');
      }


    } else {
      console.log('OnInit:: accessToken is NOT defined - either redirect to login page or get one ourselves if local testing');

    }

    // setup countdown timer
    setInterval(() => {
      if (this.countDown >= 2) {
        this.countDown -= 2;
      }
    }, 2000);

  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    setTimeout(() => { // workaround since MatSidenav has issues redrawing at the beggining
      this.media.broadcast();
      this._changeDetectorRef.detectChanges();
    });
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

}
