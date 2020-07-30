import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[mmBottomSheetContent]'
})
export class BottomSheetContentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
