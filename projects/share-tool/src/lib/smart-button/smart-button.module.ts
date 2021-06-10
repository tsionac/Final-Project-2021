import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartButtonComponent } from './smart-button.component';
import { EditShareModule } from '../edit-share/edit-share.module';



@NgModule({
  declarations: [SmartButtonComponent],
  imports: [
    CommonModule,
    EditShareModule,
  ],
  exports: [SmartButtonComponent]
})
export class SmartButtonModule { }
