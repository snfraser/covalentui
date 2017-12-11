import {AfterViewInit, Component, OnInit} from '@angular/core';

import * as L from 'leaflet';
import {MatSnackBar} from '@angular/material';
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  private map: any;

  ch1Icon: L.Icon;

  ch2Icon: L.Icon;


  constructor(private toaster: MatSnackBar, private notificationService: NotificationService) {
  }

  ngAfterViewInit() {

    this.map = L.map('mymap'); // .setView([56.2, -5.09], 14);

    // various overlays that might be used

    const osmurl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const arcgisurl = 'http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}';

    const bs1 = L.tileLayer(arcgisurl,
      {
        id: 'arcgisbase',
        attribution: 'ArcGIS: OceanBaseMap: Sources: Esri, GEBCO, NOAA, Nat Geog, DeLorme, HERE, Geonames.org',
        maxZoom: 22
      });

    const bs2 = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });

    const basemaps = {'ESRI': bs1, 'OSM': bs2};

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

  }

  ngOnInit() {


  }

  // ================================
  // Map controls and click handling
  // ================================

hclick(e) {
    this.toaster.open('You clicked at: ' + e.latlng, 'Dismiss', {duration: 2000});

    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

   //const polygon = L.circleMarker(e.latlng, {stroke: false, fillColor: 'green', fill: true, fillOpacity: 1, radius: 5}).addTo(this.map);

   const marker = L.marker([lat, lng], {icon: this.ch1Icon}).addTo(this.map);

   this.notificationService.sendSuccess('A marker was placed at (' + lat + ', ' + lng + ')', 'map-component');

}

  pindrop() {
    this.toaster.open('Waypoint editing enabled', 'Dismiss', {duration: 2000});
  }

  enabledrag() {
    this.map.dragging.enable();
    this.toaster.open('Dragging is enabled on map', 'Dismiss', {duration: 2000});
  }

  disabledrag() {
    this.map.dragging.disable();
    this.toaster.open('Dragging is disabled on map', 'Dismiss', {duration: 2000});
  }


}
