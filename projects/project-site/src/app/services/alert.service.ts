import { Injectable } from '@angular/core';
import {NotificationsService} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private readonly defPosition = ['bottom', 'right'];
  private readonly deftimeOut = 3000;


  constructor(private notify:NotificationsService) { }

  success(msg, title=undefined, position=undefined, timeOut=undefined) {

    if (title === undefined) {
      title='Success!';
    }

    if (position === undefined) {
      position=this.defPosition;
    }

    if (timeOut === undefined) {
      timeOut=this.deftimeOut;
    }


    this.notify.success(title,msg, {
      position:position,
      timeOut:timeOut,
      animate: 'fade',
      showProgressBar: true,
    });
  }

  error(msg, title=undefined, position=undefined, timeOut=undefined) {

    if (title === undefined) {
      title='Error!';
    }

    if (position === undefined) {
      position=this.defPosition;
    }

    if (timeOut === undefined) {
      timeOut=this.deftimeOut;
    }

    this.notify.error(title,msg, {
      position:position,
      timeOut:timeOut,
      animate: 'fade',
      showProgressBar: true,
    });
  }

  info(msg, title=undefined, position=undefined, timeOut=undefined) {


    if (title === undefined) {
      title='Did you know?';
    }

    if (position === undefined) {
      position=this.defPosition;
    }

    if (timeOut === undefined) {
      timeOut=this.deftimeOut;
    }

    this.notify.info(title,msg, {
      position:position,
      timeOut:timeOut,
      animate: 'fade',
      showProgressBar: true,
    });
  }

  warn(msg, title=undefined, position=undefined, timeOut=undefined) {

    if (title === undefined) {
      title='warning!';
    }

    if (position === undefined) {
      position=this.defPosition;
    }

    if (timeOut === undefined) {
      timeOut=this.deftimeOut;
    }

    this.notify.warn(title,msg, {
      position:position,
      timeOut:timeOut,
      animate: 'fade',
      showProgressBar: true,
    });
  }
}
