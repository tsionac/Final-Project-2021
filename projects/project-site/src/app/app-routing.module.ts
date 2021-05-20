// routing was based on this youtube tutorial :
// https://www.youtube.com/watch?v=Nehk4tBxD4o


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './activities/login/login.component';
import { ViewActivitiesComponent } from './activities/view-activities/view-activities.component';
import {NavComponent} from './nav/nav.component'
import { DashComponent} from './activities/Home/dash/dash.component'
import { ChangePasswordComponent } from './activities/change-password/change-password.component';

const routes: Routes = [
  {path: ''            , redirectTo: '/Login', pathMatch: 'full'},
  {path: 'Login', component: LoginComponent},
  {path: 'View activities', component: ViewActivitiesComponent},
  {path: 'Home', component: DashComponent},
  {path:'Change password', component: ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
