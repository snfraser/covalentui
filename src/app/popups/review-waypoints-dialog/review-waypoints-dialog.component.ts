import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-review-waypoints-dialog',
  templateUrl: './review-waypoints-dialog.component.html',
  styleUrls: ['./review-waypoints-dialog.component.css']
})
export class ReviewWaypointsDialogComponent implements OnInit {


  /**
   * Create a ReviewWaypointsDialog.
   * @param {MatDialogRef<ReviewWaypointsDialogComponent>} reviewWaypointsDialog Self reference.
   * @param data Injected data - waypoints.
   */
  constructor(private reviewWaypointsDialog: MatDialogRef<ReviewWaypointsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
  }

  sendWaypoints() {
    this.reviewWaypointsDialog.close();
  }

  cancelSendWaypoints() {
    this.reviewWaypointsDialog.close();
  }

}
