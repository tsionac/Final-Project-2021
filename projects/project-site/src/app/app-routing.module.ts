// routing was based on this youtube tutorial :
// https://www.youtube.com/watch?v=Nehk4tBxD4o


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateManagerComponent } from './pages/create-manager/create-manager.component';
import { LoginComponent } from './pages/login/login.component';
import { ViewActivitiesComponent } from './pages/view-activities/view-activities.component';

const routes: Routes = [
  {path: ''            , redirectTo: '/Login', pathMatch: 'full'},
  {path: 'Login', component: LoginComponent},
  {path: 'Activities', component: ViewActivitiesComponent},
  {path: 'createManager', component: CreateManagerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
