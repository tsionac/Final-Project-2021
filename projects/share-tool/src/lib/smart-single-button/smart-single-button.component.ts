import { Component, Input, OnInit } from '@angular/core';
import { RecordService } from '../services/dbAcess/record.service';
import { CurrentEntityService } from '../services/helpers/current-entity.service';

@Component({
  selector: 'smart-single-button',
  templateUrl: './smart-single-button.component.html',
  styleUrls: ['./smart-single-button.component.css']
})
export class SmartSingleButtonComponent implements OnInit {

  @Input() userID: string;
  @Input() componentID: string;

  /**
  * shoud this component shows who edits it?
  */
  @Input() isEditingVisable: boolean  = true;

  @Input() text:string;

  isnextStart: boolean;

  constructor(private recordService:RecordService, private curent:CurrentEntityService) { }

  ngOnInit(): void {
    if(this.text === undefined) {
      this.text = 'edit!';
    }
  }

  onClick() {
    if (this.isnextStart ) {
      this.isnextStart = false;
      this.onClick_editStart();
    } else {
      this.onClick_editSEnd();
      this.isnextStart = true;
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
