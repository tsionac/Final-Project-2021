import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { WebRequestInterseptor } from './services/web-request.interseptor.service';
import { ViewActivitiesComponent } from './pages/view-activities/view-activities.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViewActivitiesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: WebRequestInterseptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
