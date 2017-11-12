import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatTooltipModule,
  MatIconModule,
  MatListModule,
  MatRadioModule,
  MatSelectModule,
  MatOptionModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';

import {CovalentDynamicFormsModule} from '@covalent/dynamic-forms';
import {
  CovalentCommonModule, CovalentExpansionPanelModule, CovalentLayoutModule, CovalentMediaModule,
  CovalentStepsModule
} from '@covalent/core';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot([]),
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatChipsModule,
    MatListModule,
    MatTabsModule,
    MatSidenavModule,
    MatSelectModule,
    MatOptionModule,
    MatToolbarModule,
    MatCardModule,
    MatRadioModule,
    MatIconModule,
    CovalentLayoutModule,
  CovalentCommonModule,
    CovalentMediaModule,
    CovalentStepsModule,
    CovalentExpansionPanelModule,
    CovalentDynamicFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
