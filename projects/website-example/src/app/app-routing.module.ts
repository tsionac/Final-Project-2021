// routing was based on this youtube tutorial :
// https://www.youtube.com/watch?v=Nehk4tBxD4o


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComapnyLoginSimulatorComponent } from './comapny-login-simulator/comapny-login-simulator.component';
import { ManagerLoginComponent } from './manager-login/manager-login.component';

const routes: Routes = [
  {path: ''            , redirectTo: '/companySite', pathMatch: 'full'},
  {path: 'managerLogin', component: ManagerLoginComponent},
  {path: 'companySite' , component: ComapnyLoginSimulatorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
