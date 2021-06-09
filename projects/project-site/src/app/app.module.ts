import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import {MatFormFieldModule} from '@angular/material/form-field';

// import { DashActivitiesComponent} from './activities/dash-activities/dash-activities.component';
import { ActivityChartComponent } from './charts/activity-chart/activity-chart.component';
import { BarActivitiesChartComponent } from './charts/bar-activities-chart/bar-activities-chart.component';
import { CardComponent } from './card/card.component';
import { ChangePasswordComponent } from './activities/change-password/change-password.component';
import { CreateManagerComponent } from './activities/create-manager/create-manager.component';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ActivitiesTableComponent } from './activities-table/activities-table.component';

import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
import { ContactUSComponent } from './activities/contact-us/contact-us.component';
// import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViewActivitiesComponent,
    NavComponent,
    DashComponent,
    ActivityChartComponent,
    BarActivitiesChartComponent,
    CardComponent,
    ChangePasswordComponent,
    CreateManagerComponent,
    ActivitiesTableComponent,
    ContactUSComponent,
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
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    LoggerModule.forRoot({serverLoggingUrl: '/api/logs', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR}),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: WebRequestInterseptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
