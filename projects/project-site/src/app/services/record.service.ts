import { Injectable } from '@angular/core';
import { DateRequestService } from './helpers/date-request.service';
import { EntryGeneretor } from './helpers/enrtyGenerqator.module';
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
}
