import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartSingleButtonComponent } from './smart-single-button.component';
import { EditShareModule } from '../edit-share/edit-share.module';



@NgModule({
  declarations: [SmartSingleButtonComponent],
  imports: [
    CommonModule,
    EditShareModule,
  ],
  exports: [SmartSingleButtonComponent,]
})
export class SmartSingleButtonModule { }
