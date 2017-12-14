import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatIconModule,
  MatListModule,
  MatRadioModule,
  MatSelectModule,
  MatOptionModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatMenuModule,
  MatInputModule,
  MatGridListModule,
  MatDatepickerModule,
} from '@angular/material';

import { MatTooltipModule } from '@angular/material/tooltip';

import {CovalentDynamicFormsModule} from '@covalent/dynamic-forms';
import {
  CovalentCommonModule,
  CovalentDialogsModule,
  CovalentExpansionPanelModule,
  CovalentLayoutModule,
  CovalentLoadingModule,
  CovalentMediaModule,
  CovalentMenuModule,
  CovalentNotificationsModule,
  CovalentStepsModule
} from '@covalent/core';

import * as L from 'leaflet';

import { AppComponent } from './app.component';

import { AuthenticationService } from './services/authentication.service';
import { LoginDialogComponent } from './popups/login-dialog/login-dialog.component';
import { MapComponent } from './map/map.component';
import { NotificationService } from './services/notification.service';
import { BetweenTimesDialogComponent } from './popups/between-times-dialog/between-times-dialog.component';
import { ExamplePlotComponent } from './example-plot/example-plot.component';

import { ChartsModule } from 'ng2-charts';
import { SelectBasestationDialogComponent } from './popups/select-basestation-dialog/select-basestation-dialog.component';
import { ReviewWaypointsDialogComponent } from './popups/review-waypoints-dialog/review-waypoints-dialog.component';
import { PaddingPipe } from './pipes/padding.pipe';
import {HttpModule} from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginDialogComponent,
    MapComponent,
    BetweenTimesDialogComponent,
    ExamplePlotComponent,
    SelectBasestationDialogComponent,
    ReviewWaypointsDialogComponent,
    PaddingPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([]),
    ChartsModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatChipsModule,
    MatListModule,
    MatTabsModule,
    MatInputModule,
    MatMenuModule,
    MatSidenavModule,
    MatGridListModule,
    MatSelectModule,
    MatOptionModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCardModule,
    MatRadioModule,
    MatIconModule,
    CovalentLayoutModule,
    CovalentCommonModule,
    CovalentMediaModule,
    CovalentStepsModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    CovalentMenuModule,
    CovalentExpansionPanelModule,
    CovalentDynamicFormsModule,
    CovalentNotificationsModule],
  providers: [
    AuthenticationService,
    NotificationService],
  entryComponents: [
    LoginDialogComponent,
    BetweenTimesDialogComponent,
    SelectBasestationDialogComponent,
    ReviewWaypointsDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
