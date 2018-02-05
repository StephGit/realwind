import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import {MapService} from './map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  center: Array<number> = L.latLng(46.9646617, - 7.455726);
  zoom: number = 10;
  map: any;

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.initMap();
    this.localizeByNavigator();
    this.doSubscribtions();
  }

  initMap() {
    this.map = new L.map("map", {
      zoomControl: false,
      center: this.center,
      zoom: this.zoom,
      minZoom: 4,
      maxZoom: 19,
      layers: [this.mapService.baseMaps.CartoDB],
      setView: true,
      watch: true
    });

    L.control.zoom({ position: "topright" }).addTo(this.map);
    L.control.layers(this.mapService.baseMaps).addTo(this.map);
    L.control.scale().addTo(this.map);
    this.mapService.map = this.map;


    this.map.on('move', () => {
      const mapCenter = this.map.getCenter();
      const mapCenterReversed = [mapCenter[1], mapCenter[0]];
      this.setCurrentPosition(mapCenter);
    });
  }

  doSubscribtions() {
    // Subscribe to Extents
    this.mapService.center
      .subscribe((value) => {
        if (value !== null && value.coords !== null) {
          this.center = L.latLng(value.coords.latitude, value.coords.longitude);
          console.log(value.coords.latitude);
          console.log(value.coords.longitude);
          this.zoom = 9;
          this.setMapCenter();
        }
      });
  }

  localizeByNavigator() {
    // Get location of navigator
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(this.setCurrentPosition.bind(this), this.currentPositionOnError);
    } else {
      console.log('not support geoloc')
      // this.notificationService.error('Geolokalisierung wird durch Ihren Browser nicht unterstützt.', 'Geolocation nicht verfügbar');
    }
  }

  currentPositionOnError() {
    console.log('Error: currentPositioning')
    // this.notificationService.error('Ihre Position konnte nicht eruiert werden.', 'Geolocation nicht möglich');
  }

  setCurrentPosition(coords) {
    // Pass coordinates to mapService
    this.mapService.setCenter(coords);
  }

  setMapCenter() {
    this.map.setView(this.center, this.zoom);
  }

}


