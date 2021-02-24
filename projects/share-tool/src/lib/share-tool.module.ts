import { NgModule } from '@angular/core';
import { ShareToolComponent } from './share-tool.component';
import { SmartTextBoxComponent } from './smart-text-box/smart-text-box.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [ShareToolComponent, SmartTextBoxComponent],
  imports: [
    FormsModule,
    HttpClientModule,
  ],
  exports: [ShareToolComponent]
})
export class ShareToolModule { }
