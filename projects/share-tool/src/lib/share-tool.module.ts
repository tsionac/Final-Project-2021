import { NgModule } from '@angular/core';
import { ShareToolComponent } from './share-tool.component';
import { SmartTextBoxComponent } from './smart-text-box/smart-text-box.component';
import { HttpClientModule } from '@angular/common/http';
// import { ChartsModule } from 'ng2-charts';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditShareComponent } from './edit-share/edit-share.component';
import { SmartSingleButtonComponent } from './smart-single-button/smart-single-button.component';
import { EditShareModule } from './edit-share/edit-share.module';


@NgModule({
  declarations: [ShareToolComponent],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSliderModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    EditShareModule,
  ],
  exports: [ShareToolComponent]
})
export class ShareToolModule { }

