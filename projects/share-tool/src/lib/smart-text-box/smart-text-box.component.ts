import { Component, OnInit } from '@angular/core';
import { RecordService } from '../services/dbAcess/record.service';
import { WebRequestService } from '../services/dbAcess/web-request.service';

@Component({
  selector: 'tsnt-smart-text-box',
  templateUrl: './smart-text-box.component.html',
  styleUrls: ['./smart-text-box.component.css']
})
export class SmartTextBoxComponent implements OnInit {

  input ="";

  userID: String = 'user42';
  componentID: String = 'component58';

  constructor(private recordService:RecordService) { }



  ngOnInit(): void {
  }

  smartTextBoxtIn(){
    this.recordService.startEdit(this.userID,this.componentID);
  }

  smartTextBoxtOut(){
    this.recordService.endEdit(this.userID, this.componentID)?.subscribe( (res) => {console.log(res);});
  }

}
