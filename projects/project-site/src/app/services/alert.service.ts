import { Injectable } from '@angular/core';
import {NotificationsService} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private readonly defPosition = ['bottom', 'right'];
  private readonly deftimeOut = 5000;


  constructor(private notify:NotificationsService) { }

  success(msg, title='Success!', position=this.defPosition, timeOut=this.deftimeOut) {
    this.notify.success(title,msg, {
      position:position,
      timeOut:timeOut,
      animate: 'fade',
      showProgressBar: true,
    });
  }

  error(msg, title='Error!', position=this.defPosition, timeOut=this.deftimeOut) {
    this.notify.error(title,msg, {
      position:position,
      timeOut:timeOut,
      animate: 'fade',
      showProgressBar: true,
    });
  }

  info(msg, title='Did you know?', position=this.defPosition, timeOut=this.deftimeOut) {
    this.notify.info(title,msg, {
      position:position,
      timeOut:timeOut,
      animate: 'fade',
      showProgressBar: true,
    });
  }

  warn(msg, title='warning!', position=this.defPosition, timeOut=this.deftimeOut) {
    this.notify.warn(title,msg, {
      position:position,
      timeOut:timeOut,
      animate: 'fade',
      showProgressBar: true,
    });
  }
}
