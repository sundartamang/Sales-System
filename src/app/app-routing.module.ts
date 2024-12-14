import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { Roles } from './model';
import { AuthGuard } from './core';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: "", redirectTo: '/login', pathMatch: 'full' },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard],
      },
      {
        path: "user",
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard],
        data: { roles: [Roles.Admin] }
      },
      {
        path: "role",
        loadChildren: () => import('./modules/role/role.module').then(m => m.RoleModule),
        canActivate: [AuthGuard],
        data: { roles: [Roles.Admin] }
      },
      {
        path: "item",
        loadChildren: () => import('./modules/item/item.module').then(m => m.ItemModule),
        canActivate: [AuthGuard],
        data: { roles: [Roles.Admin, Roles.Supervisor] }
      },
      {
        path: "sale",
        loadChildren: () => import('./modules/sale/sale.module').then(m => m.SaleModule),
        canActivate: [AuthGuard],
        data: { roles: [Roles.Admin, Roles.SalesPerson] }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
