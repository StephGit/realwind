import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import {MapService} from './map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private center: Array<number> = L.latLng(46.879966, -121.726909);
  private zoom: number = 6;

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    let map = L.map("map", {
      zoomControl: false,
      center: L.latLng(46.879966, -121.726909),
      zoom: this.zoom,
      minZoom: 4,
      maxZoom: 19,
      layers: [this.mapService.baseMaps.OpenStreetMap]
    });

    L.control.zoom({ position: "topright" }).addTo(map);
    L.control.layers(this.mapService.baseMaps).addTo(map);
    L.control.scale().addTo(map);

    this.mapService.map = map;
    this.localizeByNavigator();
    this.doSubscribtions();
  }

  doSubscribtions() {
    // Subscribe to Extents
    this.mapService.center
      .subscribe((value:number) => {
        if (value !== null) {
          this.center = L.latLng(value[0], value[1]);
          this.zoom = 6;
        }
      });
  }

  localizeByNavigator() {
    // Get location of navigator
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(this.setCurrentPosition.bind(this), this.currentPositionOnError);
    } else {
      // this.notificationService.error('Geolokalisierung wird durch Ihren Browser nicht unterstützt.', 'Geolocation nicht verfügbar');
    }
  }

  currentPositionOnError() {
    // this.notificationService.error('Ihre Position konnte nicht eruiert werden.', 'Geolocation nicht möglich');
  }

  setCurrentPosition(coords) {
    // Pass coordinates to mapService
    this.mapService.setCenter(coords);
  }


}


