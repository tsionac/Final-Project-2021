// routing was based on this youtube tutorial :
// https://www.youtube.com/watch?v=Nehk4tBxD4o


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './activities/login/login.component';
import { ViewActivitiesComponent } from './activities/view-activities/view-activities.component';
import {NavComponent} from './nav/nav.component'
import { DashComponent} from './activities/Home/dash/dash.component'
import { ChangePasswordComponent } from './activities/change-password/change-password.component';
import { CreateManagerComponent } from './activities/create-manager/create-manager.component';
import { ActivitiesTableComponent } from './activities-table/activities-table.component';
import { ContactUSComponent } from './activities/contact-us/contact-us.component';
const routes: Routes = [
  {path: ''            , redirectTo: 'Login', pathMatch: 'full'},
  {path: 'Login', component: LoginComponent},
  {path: 'View Activities', component: ActivitiesTableComponent},
  {path: 'Home', component: DashComponent},
  {path:'Change Password', component: ChangePasswordComponent},
  {path: 'Create Manager', component: CreateManagerComponent},
  {path: 'Contact Us', component:ContactUSComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
