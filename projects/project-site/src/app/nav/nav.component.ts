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
  menuItemsOrg = ['Home','View Activities', 'Create Manager', 'Change Password', 'Contact Us'];
  menuItems = []
  public username:string = '';
  isHidden: boolean = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public route:ActivatedRoute,public router:Router, public authService:AuthenticationService) {}

  public logout(){
    this.authService.logout();
    this.router.navigate(['/Login']);
    // router.navigate(['/Home'])
  }

  public isAdmin(){
    this.menuItems = this.menuItemsOrg;
    // this.username != 'Admin'  item != 'Create Manager'
    if(this.authService.getUserID() != 'Admin'){
      this.menuItems = this.menuItemsOrg.filter(word => word != 'Create Manager')
    }
  }

  ngOnInit(): void {
    this.menuItems = this.menuItemsOrg;
    this.username = this.authService.getUserID();
  }
}
