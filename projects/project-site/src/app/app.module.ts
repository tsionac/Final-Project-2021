import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './activities/login/login.component';
import { WebRequestInterseptor } from './services/web-request.interseptor.service';
import { ViewActivitiesComponent } from './activities/view-activities/view-activities.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashComponent } from './activities/Home/dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { DashActivitiesComponent} from './activities/dash-activities/dash-activities.component';
import { ActivityChartComponent } from './charts/activity-chart/activity-chart.component';
import { BarActivitiesChartComponent } from './charts/bar-activities-chart/bar-activities-chart.component';
import { CardComponent } from './card/card.component';
import { ChangePasswordComponent } from './activities/change-password/change-password.component';
import { CreateManagerComponent } from './activities/create-manager/create-manager.component';


import {SimpleNotificationsModule} from 'angular2-notifications';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
// import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViewActivitiesComponent,
    NavComponent,
    DashComponent,
    DashActivitiesComponent,
    ActivityChartComponent,
    BarActivitiesChartComponent,
    CardComponent,
    ChangePasswordComponent,
    CreateManagerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    NoopAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    LoggerModule.forRoot({serverLoggingUrl: '/api/logs', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR}),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: WebRequestInterseptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
