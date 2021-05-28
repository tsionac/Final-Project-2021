import { Injectable } from '@angular/core';
import { DateRequestService } from '../helpers/date-request.service';
import { EntryGeneretor } from '../helpers/enrtyGenerqator.module';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private uri:String = '/records';

  constructor(private wrs:WebRequestService, private drs:DateRequestService, private enryCreator:EntryGeneretor) {
   };

  getRecords(){
    return this.wrs.get(this.uri);
  };

  getEditors(componetID:String){
    return this.wrs.get(`${this.uri}/${componetID}/currentlyEditing`);
  };


  startEdit(userID:String, componentID:String){
    return this.wrs.post(this.uri, this.enryCreator.createRecord(userID, componentID, -1, this.drs.getCurrentTime(), undefined) );
  };

  endEdit(userID:String, componentID:String, actionID:Number){
    return this.wrs.post(this.uri, this.enryCreator.createRecord(userID, componentID,actionID, undefined, this.drs.getCurrentTime()) );
  };


}
