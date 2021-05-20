import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-create-manager',
  templateUrl: './create-manager.component.html',
  styleUrls: ['./create-manager.component.css']
})
export class CreateManagerComponent implements OnInit {

  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void {
  }

  createManamager(userID:string, companyID:string, password:string) {
    return this.authService.signup(userID, companyID, password).subscribe((user) => {
     console.log(`created user :`);
     console.log(user);
    })
  }

}
