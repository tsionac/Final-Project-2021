import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ShareToolModule } from 'share-tool';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ShareToolModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
