// routing was based on this youtube tutorial :
// https://www.youtube.com/watch?v=Nehk4tBxD4o


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: ''            , redirectTo: '/Login', pathMatch: 'full'},
  {path: 'Login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
