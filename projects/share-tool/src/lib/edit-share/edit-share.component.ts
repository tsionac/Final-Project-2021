import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RecordService } from '../services/dbAcess/record.service';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs';
import { CurrentEntityService } from '../services/helpers/current-entity.service';

@Component({
  selector: 'edit-share',
  templateUrl: './edit-share.component.html',
  styleUrls: ['./edit-share.component.css']
})
export class EditShareComponent implements OnInit,OnDestroy {


  /**
   * A list of all the activities in the company
   */
   editors: String[];

   /**
    * the ammunt of millisecing between eatch call the get the curently editing
    */
   readonly Retrive_timer:number = 5000;

   /**
    * the observable that act as a timer
    */
   sub;



  constructor(private recordService:RecordService, private current:CurrentEntityService) { }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  ngOnInit(): void {

    this.sub = Observable.interval(this.Retrive_timer)
    .subscribe((val) => { this.getEditors(); });

    this.getEditors();
  }

  getEditors() {
    this.recordService.getEditors(this.getCurrentComponent()).subscribe((editors: String[]) => {
      this.editors = editors;
    });
  }

  stopTimer() {
    this.sub.unsubscribe();
  }

  getCurrentComponent() {
    return this.current.getCurrentEntity();
  }

}