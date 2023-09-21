import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LogoutComponent } from './logout/logout.component';
import { PensionportalComponent } from './pensionportal/pensionportal.component';
import { SecurityComponent } from './security/security.component';
import { RouteguardService } from './service/routeguard.service';

const routes: Routes = [
  // ,canActivate:[RouteguardService]
  {path:'',component:SecurityComponent,canActivate:[RouteguardService]},
  {path:'dashboard',component:DashboardComponent,canActivate:[RouteguardService]},
  {path:'login',component:SecurityComponent},
  {path:'portal',component:PensionportalComponent ,canActivate:[RouteguardService]},
  {path:'homepage',component:HomepageComponent},
  {path:'logout',component:LogoutComponent},
  {path:'**',component:ErrorComponent}
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
