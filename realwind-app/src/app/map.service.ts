
import {Injectable} from "@angular/core";
import * as L from "leaflet";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class MapService {

  public center = new BehaviorSubject(null);

  public map: L.Map;
  public baseMaps: any;

  constructor() {
    this.baseMaps = {
      CartoDB: L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
      }),
      OpenStreetMap: L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
      })
    };
  }

  setCenter(coords) {
    this.center.next(coords);
  }



}
