import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {IWaypoint} from "../models/waypoint";
import {Observable} from "rxjs/Observable";

@Injectable()
export class WaypointsService {

  constructor() { }


  /** A subject to handle inter-component communications.*/
  private subject = new Subject<IWaypoint>();


  /** Send a message to be caught be other components - experimental.*/
  addWaypoint(waypoint: IWaypoint) {
    this.subject.next(waypoint);
  }

  /** Clear the message - ?? why ?? */
  clearMessage() {
    this.subject.next();
  }

  /** Subscribe to messages over ICC channel.*/
  getWaypoint(): Observable<IWaypoint> {
    return this.subject.asObservable();
  }

}
