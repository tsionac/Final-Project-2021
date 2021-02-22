import { NgModule } from '@angular/core';
import { ShareToolComponent } from './share-tool.component';
import { SmartTextBoxComponent } from './smart-text-box/smart-text-box.component';



@NgModule({
  declarations: [ShareToolComponent, SmartTextBoxComponent],
  imports: [
  ],
  exports: [ShareToolComponent]
})
export class ShareToolModule { }
