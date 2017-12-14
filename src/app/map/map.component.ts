import {AfterViewInit, Component, OnInit} from '@angular/core';

import * as L from 'leaflet';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {NotificationService} from '../services/notification.service';
import {BetweenTimesDialogComponent} from '../popups/between-times-dialog/between-times-dialog.component';
import {ReviewWaypointsDialogComponent} from '../popups/review-waypoints-dialog/review-waypoints-dialog.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  private map: any;

  ch1Icon: L.Icon;

  ch2Icon: L.Icon;

  waypoints = [];

  markers = [];

  mapWptMode = 3; // 1=drop, 2=move, 3=none

  constructor(private toaster: MatSnackBar,
              private dialogFactory: MatDialog,
              private notificationService: NotificationService) {
  }

  ngAfterViewInit() {

    this.map = L.map('mymap'); // .setView([56.2, -5.09], 14);

    // various overlays that might be used

    const osmurl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const arcgisurl = 'http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}';

    const stamenurl = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';

    const bs1 = L.tileLayer(arcgisurl,
      {
        id: 'arcgisbase',
        attribution: 'ArcGIS: OceanBaseMap: Sources: Esri, GEBCO, NOAA, Nat Geog, DeLorme, HERE, Geonames.org',
        maxZoom: 22
      });

    const bs2 = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });

    const bs3 = L.tileLayer(stamenurl, {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      subdomains: 'abcd',
      minZoom: 3,
      maxZoom: 16
    });

    const basemaps = {'ESRI': bs1, 'OSM': bs2, 'STA': bs3};

    L.control.layers(basemaps, null).addTo(this.map);

    // Add navionics chart layer - when we work out how to import it
    /* const navoverlay = JNC.Leaflet.NavionicsOverlay({
      navKey: 'Navionics_webapi_03160',
      chartType: JNC.NAVIONICS_CHARTS.NAUTICAL,
      isTransparent: false,
      zIndex: 1
    });

    navoverlay.addTo(this.map); */


    this.map.setView([56.2, -6.09], 11);


    // TEST - create a new marker icon and display it - no shadow icon
    const greenIcon = L.icon({
      iconUrl: 'assets/sailicon.png',
      shadowUrl: '',

      iconSize: [32, 32], // size of the icon
      shadowSize: [32, 32], // size of the shadow
      iconAnchor: [10, 16], // point of the icon which will correspond to marker's location
      shadowAnchor: [0, 0],  // the same for the shadow
      popupAnchor: [-3, -7] // point from which the popup should open relative to the iconAnchor
    });

    // corsshairs 1 test
    this.ch1Icon = L.icon({
      iconUrl: 'assets/crosshairs1.png',
      shadowUrl: '',

      iconSize: [16, 16], // size of the icon
      shadowSize: [32, 32], // size of the shadow
      iconAnchor: [8, 8], // point of the icon which will correspond to marker's location
      shadowAnchor: [0, 0],  // the same for the shadow
      popupAnchor: [-3, -7] // point from which the popup should open relative to the iconAnchor
    });

    // crosshairs2 test
    this.ch2Icon = L.icon({
      iconUrl: 'assets/crosshairs2.png',
      shadowUrl: '',

      iconSize: [16, 16], // size of the icon
      shadowSize: [32, 32], // size of the shadow
      iconAnchor: [8, 8], // point of the icon which will correspond to marker's location
      shadowAnchor: [0, 0],  // the same for the shadow
      popupAnchor: [-3, -7] // point from which the popup should open relative to the iconAnchor
    });


    L.marker([56.5, -5.5], {icon: greenIcon}).addTo(this.map);

    // add listener for click on map - the behaviour will depend on what mode etc...
    this.map.on('click', e => this.hclick(e));


    const ctx = document.getElementById('mymap');
    console.log('Map context from document model...');
    console.log(ctx);

  }

  ngOnInit() {


  }

  // ================================
  // Map controls and click handling
  // ================================

  /**
   * Handle a click on the map area
   * @param e The click event.
   */
  hclick(e) {

    switch (this.mapWptMode) {
      case 1:
        // drop

        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        //const polygon = L.circleMarker(e.latlng, {stroke: false, fillColor: 'green', fill: true, fillOpacity: 1, radius: 5}).addTo(this.map);

        const marker = L.marker([lat, lng], {
          icon: this.ch1Icon,
          title: 'wpt-' + this.waypoints.length
        }).addTo(this.map);

        this.markers.push(marker);

        marker.on('dragend', e => {
          console.log('Dragend marker: ' + marker.options.title);
          console.log('Dropping waypoint at: (' + marker.getLatLng().lat + ', ' + marker.getLatLng().lng + ')');
          // at this point update the waypoints table also - they should be associated with the markers...
        });

        this.notificationService.sendSuccess('A marker was placed at (' + lat + ', ' + lng + ')', 'map-component');

        this.waypoints.push({name: 'WPT-' + (this.waypoints.length - 1), lat: +lat, lng: +lng});

        break;

      case 2:
        // move
        // detect where we clicked, find nearest wpt and allow to move...animate
        this.toaster.open('Locating wpt nearest to: ' + e.latlng, 'Dismiss', {duration: 2000});

        break;
      case 3:
        // none - out of here
        break;

    }


  }


  enabledrag() {
    this.map.dragging.enable();
    this.toaster.open('Dragging is enabled on map', 'Dismiss', {duration: 2000});
  }

  disabledrag() {
    this.map.dragging.disable();
    this.toaster.open('Dragging is disabled on map', 'Dismiss', {duration: 2000});
  }

  /**
   * Start editing and adding waypoints.
   */
  startWaypoints() {
    this.mapWptMode = 1;
    document.getElementById('mymap').style.cursor = 'crosshair';
    this.toaster.open('Waypoint editing enabled', 'Dismiss', {duration: 2000});
  }

  /**
   * Finish editing or adding waypoints.
   */
  endWaypoints() {
    this.mapWptMode = 3;
    document.getElementById('mymap').style.cursor = 'auto';
    const dialogRef = this.dialogFactory.open(ReviewWaypointsDialogComponent, {data: {waypoints: this.waypoints}});

    this.markers.forEach(
      (marker) => {
        // detect when we enter the marker's zone, need this to allow dragging
        marker.dragging.disable();
      });

  }

  /**
   * Delete the last waypoint added.
   */
  deleteLastWaypoint() {
  }

  /**
   * Delete ALL waypoints added so far.
   */
  clearWaypoints() {

    this.markers.forEach(marker => {
      marker.removeFrom(this.map);
    });

    this.markers.length = 0;

    this.waypoints.length = 0;

  }

  /**
   * Start moving waypoints - grab a waypoint and select a new location.
   * Remains in force until startWaypoints is selected again.
   */
  moveWaypoints() {
    this.mapWptMode = 2;
    document.getElementById('mymap').style.cursor = 'all-scroll';
    // disable the click function: map-waypoint_mode = WPT_MOVE_MODE

    this.markers.forEach(
      (marker) => {
        // detect when we enter the marker's zone, need this to allow dragging
        marker.dragging.enable();
      });
  }

  // =================
  // Popup Dialogs etc
  // =================

  showBetweenTimesDialog() {
    const btd = this.dialogFactory.open(BetweenTimesDialogComponent);
    btd.afterClosed().subscribe(data => console.log(data));
  }


}
