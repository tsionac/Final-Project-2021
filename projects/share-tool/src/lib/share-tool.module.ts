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


@NgModule({
  declarations: [ShareToolComponent, SmartTextBoxComponent],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSliderModule,
    // ChartsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [ShareToolComponent]
})
export class ShareToolModule { }

