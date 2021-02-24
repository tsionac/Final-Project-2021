import { Injectable } from '@angular/core';
import { ActiveEdits } from '../helpers/activeEdits.module';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private wrs:WebRequestService, private userEdits:ActiveEdits) {
   };

  getRecords(){
    return this.wrs.get('/records');
  };

  startEdit(userID:String, componentID:String){
    this.userEdits.startEdit(userID,componentID);
  };

  endEdit(userID:String, componentID:String){
    let editStart = this.userEdits.endEdit(userID,componentID);

    if(editStart !== undefined){
      return this.wrs.post('/records', {userID, componentID, editStart,});
    }
    else {
      return null;
    }
  };


}
