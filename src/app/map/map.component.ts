import {AfterViewInit, Component, OnInit} from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  private map: any;

  constructor() { }

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

    //setTimeout(() => {this.map.setView([56.2, -5.09], 14); }, 5000);

    this.map.setView([56.2, -5.09], 14);
  }

  ngOnInit() {


  }

}
