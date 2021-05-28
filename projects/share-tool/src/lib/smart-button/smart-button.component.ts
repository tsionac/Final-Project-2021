import { Component, Input, OnInit } from '@angular/core';
import { RecordService } from '../services/dbAcess/record.service';

@Component({
  selector: 'smart-button',
  templateUrl: './smart-button.component.html',
  styleUrls: ['./smart-button.component.css']
})
export class SmartButtonComponent implements OnInit {

  @Input() isStartButton: boolean;
  @Input() userID: string;
  @Input() comp_ID: string;

  txt:string = 'start!';

  constructor(private recordService:RecordService) { }

  ngOnInit(): void {
    if (!this.isStartButton) {
      this.txt = 'end!';
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
    this.recordService.startEdit(this.userID,this.comp_ID)?.subscribe( (res) => {/*console.log(res);*/});;
  }

  onClick_editSEnd(){
    this.recordService.endEdit(this.userID, this.comp_ID, 1)?.subscribe( (res) => { /*console.log(res);*/});
  }

}
