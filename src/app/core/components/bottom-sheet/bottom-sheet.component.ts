import { Component, ViewChild, Input, Type, ComponentFactoryResolver } from '@angular/core';
import { BottomSheetContentDirective } from '@app/shared/directives';

@Component({
  selector: 'mm-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent {
  @ViewChild(BottomSheetContentDirective, { static: true })
  content: BottomSheetContentDirective;

  private _contentComponent: Type<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  @Input()
  set contentComponent(component: Type<any>) {
    this._contentComponent = component;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this._contentComponent);
    const viewContainerRef = this.content.viewContainerRef;
    viewContainerRef.createComponent(componentFactory);
  }
  get contentComponent(): Type<any> {
    return this._contentComponent;
  }
}
