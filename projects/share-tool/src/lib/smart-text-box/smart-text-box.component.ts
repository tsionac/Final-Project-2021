import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'tsnt-smart-text-box',
  templateUrl: './smart-text-box.component.html',
  styleUrls: ['./smart-text-box.component.css']
})
export class SmartTextBoxComponent implements OnInit {
  public msg = "";
  public i = 0;
  public s_url = window.location.href;
  constructor() { }


  onClick(event){
    this.i = this.i + 1;
    console.log(event);
    this.msg = "Welcome"+this.i 
  }
  // ngOnChanges(): void {
  //   this.doSomething(this.input);
  // }
  // // private doSomething(input: string) {
  //   console.log('pipi')
  // }

  ngOnInit(): void {
  }

}
