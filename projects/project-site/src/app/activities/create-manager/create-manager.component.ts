import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-create-manager',
  templateUrl: './create-manager.component.html',
  styleUrls: ['./create-manager.component.css']
})
export class CreateManagerComponent implements OnInit {

  constructor(private authService:AuthenticationService,  private alert:AlertService) { }

  ngOnInit(): void {
  }

  createManamager(userID:string, companyID:string, password:string) {
    return this.authService.signup(userID, companyID, password).subscribe((user) => {
      this.alert.success('manager created successfully!');
    })
  }

}
