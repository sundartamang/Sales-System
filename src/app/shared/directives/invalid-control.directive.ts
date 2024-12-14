import { Directive, ElementRef, Renderer2, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appInvalidControl]'
})
export class InvalidControlDirective implements OnChanges {

  @Input() control!: AbstractControl;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.control) {
      this.updateValidationState();
    }
  }

  private updateValidationState() {
    if (this.control.invalid && this.control.touched) {
      this.renderer.addClass(this.el.nativeElement, 'invalid-control');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'invalid-control');
    }
  }

}
