import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './admin.component';
import { ROUTE_URLS } from '../route-urls.const';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from '@shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: ROUTE_URLS.LOGIN, component: LoginComponent },
      { path: ROUTE_URLS.LOGOUT, component: LoginComponent },
      {
        path: ROUTE_URLS.DASHBAORD,
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: `/${ROUTE_URLS.ADMIN}/${ROUTE_URLS.LOGIN}`,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
