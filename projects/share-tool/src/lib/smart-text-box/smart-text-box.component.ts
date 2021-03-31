import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RecordService } from '../services/dbAcess/record.service';
import { WebRequestService } from '../services/dbAcess/web-request.service';

@Component({
  selector: 'tsnt-smart-text-box',
  templateUrl: './smart-text-box.component.html',
  styleUrls: ['./smart-text-box.component.css']
})
export class SmartTextBoxComponent implements OnInit, OnChanges{
  @Input() userID: String;
  @Input() comp_ID: String;

  input ="";

  // userID: String;
  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'userID'){
        const chng = changes[propName];
        // const cur  = JSON.stringify(chng.currentValue);
        this.userID = chng.currentValue;
      }
      if (propName === 'comp_ID'){
        const chng = changes[propName];
        // const cur  = JSON.stringify(chng.currentValue);
        this.comp_ID = chng.currentValue;
      }
    }
  }

  constructor(private recordService:RecordService) { }

  ngOnInit(): void {
  }

  smartTextBoxtIn(){
    this.recordService.startEdit(this.userID,this.comp_ID)?.subscribe( (res) => {/*console.log(res);*/});;
  }

  smartTextBoxtOut(){
    this.recordService.endEdit(this.userID, this.comp_ID)?.subscribe( (res) => {console.log(res);});
  }

}
