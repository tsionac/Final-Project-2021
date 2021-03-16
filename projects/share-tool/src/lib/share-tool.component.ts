import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'tsnt-share-tool',
  templateUrl: './share-tool.component.html',
  styleUrls: ['./share-tool.component.css']
})
export class ShareToolComponent implements OnInit, OnChanges {
  @Input() user: String;
  @Input() comp_id: String;
  curr_user;
  curr_id;
  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'user'){
        const chng = changes[propName];
        // const cur  = JSON.stringify(chng.currentValue);
        this.curr_user = chng.currentValue;
      }
      if (propName === 'comp_id'){
        const chng = changes[propName];
        // const cur  = JSON.stringify(chng.currentValue);
        this.curr_id = chng.currentValue;
      }
       
    }
  }
 
  
  
  // curr_user = this.user;//?????????????????
  ngOnInit(): void {
    // this.id =

    this.curr_user = this.user;
    this.curr_id = this.comp_id;

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }


}
