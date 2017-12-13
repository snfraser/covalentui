import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-select-basestation-dialog',
  templateUrl: './select-basestation-dialog.component.html',
  styleUrls: ['./select-basestation-dialog.component.css']
})
export class SelectBasestationDialogComponent implements OnInit {

  selectedBasestation;


  stations: Object[] = [
    {name: 'NOCS Gliderbase1'},
    {name: 'NOCS Gliderbase2'},
    {name: 'NOCS Terminal-A'},
    {name: 'SAMS Vocal'},
    {name: 'SAMS Vega'}
  ];

  constructor(public baseStationSelectDialog: MatDialogRef<SelectBasestationDialogComponent>) { }

  ngOnInit() {
  }

  selectBasestation() {

    this.baseStationSelectDialog.close(this.selectedBasestation);
  }

}
