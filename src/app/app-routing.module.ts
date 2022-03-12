import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ElementMasterComponent } from './components/element-master/element-master.component';
import { LoginComponent } from './components/login/login.component';
import { MetalMasterComponent } from './components/metal-master/metal-master.component';
import { MetalRegisterComponent } from './components/metal-register/metal-register.component';
import { RoutingConstants } from './constants/routing.constants';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: RoutingConstants.login, component: LoginComponent },
  { path: RoutingConstants.dashBoard, component: DashboardComponent, canActivate: [AuthGuard] },
  { path: RoutingConstants.metalRegister, component: MetalRegisterComponent, canActivate: [AuthGuard] },
  { path: RoutingConstants.metalMaster, component: MetalMasterComponent, canActivate: [AuthGuard] },
  { path: RoutingConstants.elementMaster, component: ElementMasterComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
