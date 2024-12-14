import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleComponent } from './sale.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: SaleComponent }
];

@NgModule({
  declarations: [
    SaleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SaleModule { }
