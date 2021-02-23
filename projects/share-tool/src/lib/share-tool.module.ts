import { NgModule } from '@angular/core';
import { ShareToolComponent } from './share-tool.component';
import { SmartTextBoxComponent } from './smart-text-box/smart-text-box.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ShareToolComponent, SmartTextBoxComponent],
  imports: [FormsModule
  ],
  exports: [ShareToolComponent]
})
export class ShareToolModule { }
