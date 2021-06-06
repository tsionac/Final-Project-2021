import { Component, Input, OnInit } from '@angular/core';
import { RecordService } from '../services/dbAcess/record.service';
import { CurrentEntityService } from '../services/helpers/current-entity.service';

@Component({
  selector: 'smart-button',
  templateUrl: './smart-button.component.html',
  styleUrls: ['./smart-button.component.css']
})
export class SmartButtonComponent implements OnInit {

  @Input() isStartButton: boolean;
  @Input() userID: string;
  @Input() componentID: string;

  /**
  * shoud this component shows who edits it?
  */
  @Input() isEditingVisable: boolean  = true;

  @Input() text:string;

  constructor(private recordService:RecordService, private curent:CurrentEntityService) { }

  ngOnInit(): void {
    if(this.text === undefined) {
      if (this.isStartButton) {
        this.text = 'start!';
      }else {
        this.text = 'end!';
      }
    }
  }

  onClick() {
    if (this.isStartButton ) {
      this.onClick_editStart();
    } else {
      this.onClick_editSEnd();
    }
  }

  onClick_editStart(){
    this.curent.setCurrentEntity(this.componentID);
    this.recordService.startEdit(this.userID,this.componentID)?.subscribe( (res) => {/*console.log(res);*/});;
  }

  onClick_editSEnd(){
    this.curent.clear();
    this.recordService.endEdit(this.userID, this.componentID, 1)?.subscribe( (res) => { /*console.log(res);*/});
  }

}
