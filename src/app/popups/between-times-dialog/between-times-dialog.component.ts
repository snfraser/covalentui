import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-between-times-dialog',
  templateUrl: './between-times-dialog.component.html',
  styleUrls: ['./between-times-dialog.component.css']
})
export class BetweenTimesDialogComponent implements OnInit {

  model: Object = {start: '', end: ''};

  constructor(private dialogRef: MatDialogRef<BetweenTimesDialogComponent>) {
  }

  ngOnInit() {
  }

  processBetweenTimes() {
    this.dialogRef.close(this.model); // add data from date-pickers to response

  }

  cancelBetweenTimes() {
    this.dialogRef.close();
  }
}
