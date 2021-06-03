import { Component,OnDestroy, Directive, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { LoginComponent } from '../../login/login.component';
import { AuthenticationService } from '../../../services/authentication.service';
import { AlertService } from '../../../services/alert.service';



@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
  providers: [LoginComponent]
})
export class DashComponent implements OnInit {

  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.


  public username:string = '';
  /** Based on the screen size, switch from standard to one column per row */
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          // miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }

     return {
        columns: 4,
        // miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 4 },
      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, public authServics: AuthenticationService,  private alert:AlertService) {

  }

  ngOnInit(): void {
    this.username = this.authServics.getUserID();
  }


}
