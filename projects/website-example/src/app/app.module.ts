import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ShareToolModule } from 'share-tool';
import {SmartTextBoxComponent} from 'share-tool';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { ManagerLoginComponent } from './manager-login/manager-login.component';
import { ComapnyLoginSimulatorComponent } from './comapny-login-simulator/comapny-login-simulator.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManagerLoginComponent,
    ComapnyLoginSimulatorComponent,
  ],
  imports: [
    BrowserModule,
    ShareToolModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
