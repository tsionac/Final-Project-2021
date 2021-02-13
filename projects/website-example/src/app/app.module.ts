import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ShareToolModule } from 'share-tool';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ShareToolModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
