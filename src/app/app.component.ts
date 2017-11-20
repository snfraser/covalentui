import { Component, HostBinding, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TdMediaService } from '@covalent/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {

  selectroute = '';
  selectedglider = '';
  selectedmission = '';
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
  navmenu: Object[] = [{
    icon: 'local_airport',
    route: '.',
    title: 'Bellatrix',
    description: 'SG123 - Slocum',
  }, {
    icon: 'local_airport',
    route: '.',
    title: 'Canopus',
    description: 'SG345 - Seaglider',
  }, {
    icon: 'local_airport',
    route: '.',
    title: 'Talisker',
    description: 'SG453 - Slocum',
  }, {
    icon: 'local_airport',
    route: '.',
    title: 'Denebola',
    description: 'SG545 - Seaglider',
  }, {
    icon: 'local_airport',
    route: '.',
    title: 'Scapa',
    description: 'SG163 - Slocum',
  },
  ];

  tabs: Object[] = [
    {title: 'Mission', x: 'A form and stuff to select missions and plan stuff here'},
    {title: 'Charts', x: 'Engineering data charts etc'},
    {title: 'Log', x: 'A log of events relating to the glider'}
  ];

  missions: Object[] = [
    {id: 1, name: 'CalibFlight'},
    {id: 2, name: 'OutwardBound'},
    {id: 3, name: 'ScienceRun-1'}
  ];

  plans: Object[] = [
    {id: 1, value: 'Launch'},
    {id: 2, value: 'Dives 2-4'},
    {id: 3, value: 'Dives 5-12'},
    {id: 4, value: 'Calib Dive-1'},
    {id: 5, value: 'Science d13-24'}
  ];

  constructor(private _changeDetectorRef: ChangeDetectorRef,
              public media: TdMediaService) {}

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

}
