import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartTextBoxComponent } from './smart-text-box.component';
import { EditShareModule } from '../edit-share/edit-share.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [SmartTextBoxComponent],
  imports: [
    CommonModule,
    EditShareModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSliderModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    EditShareModule,
  ],
  exports: [SmartTextBoxComponent,
    MatSliderModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,]
})
export class SmartTextBoxModule { }
