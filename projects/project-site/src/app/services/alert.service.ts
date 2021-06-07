import { Injectable } from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import { Component } from "@angular/core";
import { NGXLogger } from "ngx-logger";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private readonly defPosition = ['bottom', 'right'];
  private readonly deftimeOut = 3000;


  constructor(private notify:NotificationsService, private logger: NGXLogger) { }

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

    this.logger.info(title, msg);

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

    this.logger.error(title, msg);

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

    // this.logger.info(title, msg);

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

    this.logger.warn(title, msg);

    this.notify.warn(title,msg, {
      position:position,
      timeOut:timeOut,
      animate: 'fade',
      showProgressBar: true,
    });
  }
}
