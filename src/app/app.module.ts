import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

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
  CovalentExpansionPanelModule,
  CovalentLayoutModule,
  CovalentLoadingModule,
  CovalentMediaModule, CovalentMenuModule, CovalentNotificationsModule,
  CovalentStepsModule
} from '@covalent/core';

import * as L from 'leaflet';

import { AppComponent } from './app.component';

import { AuthenticationService } from './authentication.service';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MapComponent } from './map/map.component';
import { NotificationService } from './services/notification.service';
import { BetweenTimesDialogComponent } from './popups/between-times-dialog/between-times-dialog.component';
import { ExamplePlotComponent } from './example-plot/example-plot.component';

import {ChartsModule} from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    LoginDialogComponent,
    MapComponent,
    BetweenTimesDialogComponent,
    ExamplePlotComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    CovalentLoadingModule,
    CovalentMenuModule,
    CovalentExpansionPanelModule,
    CovalentDynamicFormsModule,
    CovalentNotificationsModule],
  providers: [
    AuthenticationService,
    NotificationService],
  entryComponents: [LoginDialogComponent, BetweenTimesDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
