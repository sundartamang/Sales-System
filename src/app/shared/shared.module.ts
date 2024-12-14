import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvalidControlDirective } from './directives/invalid-control.directive';

@NgModule({
  declarations: [
    InvalidControlDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InvalidControlDirective,
  ]
})
export class SharedModule { }
