import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[mmAutofocus]'
})
export class AutofocusDirective implements OnInit {
  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.elementRef.nativeElement.focus();
  }
}
