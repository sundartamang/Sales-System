import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      {
        path: "",
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: "user",
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
      },
      {
        path: "role",
        loadChildren: () => import('./modules/role/role.module').then(m => m.RoleModule),
      },
      {
        path: "item",
        loadChildren: () => import('./modules/item/item.module').then(m => m.ItemModule),
      },
      {
        path: "sale",
        loadChildren: () => import('./modules/sale/sale.module').then(m => m.SaleModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
