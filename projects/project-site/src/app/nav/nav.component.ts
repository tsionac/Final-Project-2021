import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from 'node_modules/@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  menuItems = ['Home','View Activities', 'Create Manager', 'Change Password', 'Contact Us'];
  public username:string = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public route:ActivatedRoute,public router:Router, private authService:AuthenticationService) {}

  public logout(){
    this.authService.logout();
    this.router.navigate(['/Login']);
    // router.navigate(['/Home'])
  }
  ngOnInit(): void {
    this.username = this.authService.getUserID();
  }
}
