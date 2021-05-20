import { Injectable } from '@angular/core';
import { Observable,PartialObserver } from 'rxjs';
import { Activity } from '../modules/Activity.module';
import { DateRequestService } from './helpers/date-request.service';
import { EntryGeneretor } from './helpers/enrtyGenerqator.module';
import { WebRequestService } from './web-request.service';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RecordService {
  
  private uri:String = '/records';


  constructor(private wrs:WebRequestService, private drs:DateRequestService, private enryCreator:EntryGeneretor) {
   };

  getRecords(){
    return (this.wrs.get(this.uri));
  }


//  getUserId(){
//    return (this.wrs.get(this.uri)).
//  }
}
