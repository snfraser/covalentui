import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  model: Object = {userName: '', password: ''};

  hidePassword = true;


  constructor(public loginDialog: MatDialogRef<LoginDialogComponent>) { }

  ngOnInit() {
  }

  processLogin() {



    this.loginDialog.close(this.model);

  }

}
