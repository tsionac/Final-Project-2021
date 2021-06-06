import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RecordService } from '../services/dbAcess/record.service';
import { WebRequestService } from '../services/dbAcess/web-request.service';
import { CurrentEntityService } from '../services/helpers/current-entity.service';

@Component({
  selector: 'smart-text-box',
  templateUrl: './smart-text-box.component.html',
  styleUrls: ['./smart-text-box.component.css']
})
export class SmartTextBoxComponent implements OnInit, OnChanges{
  @Input() userID: string;
  @Input() componentID: string;

   /**
  * shoud this component shows who edits it?
  */
    @Input() isEditingVisable: boolean = true;

  input ="";

  // userID: String;
  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'userID'){
        const chng = changes[propName];
        // const cur  = JSON.stringify(chng.currentValue);
        this.userID = chng.currentValue;
      }
      if (propName === 'componentID'){
        const chng = changes[propName];
        // const cur  = JSON.stringify(chng.currentValue);
        this.componentID = chng.currentValue;
      }
    }
  }

  constructor(private recordService:RecordService, private curent:CurrentEntityService) { }

  ngOnInit(): void {
  }

  smartTextBoxtIn(){
    this.curent.setCurrentEntity(this.componentID);
    this.recordService.startEdit(this.userID,this.componentID)?.subscribe( (res) => {/*console.log(res);*/});;
  }

  smartTextBoxtOut(){
    this.curent.clear();
    this.recordService.endEdit(this.userID, this.componentID, this.getAction())?.subscribe( (res) => {/*console.log(res);*/});
  }

  getAction(){
    return 1;
  }

}
