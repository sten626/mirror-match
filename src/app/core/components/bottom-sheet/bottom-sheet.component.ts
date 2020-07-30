import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  Type,
  ViewChild
} from '@angular/core';
import { BottomSheetContentDirective } from '@app/shared/directives';
import { bottomSheetAnimations } from './bottom-sheet.animations';

@Component({
  selector: 'mm-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  animations: bottomSheetAnimations
})
export class BottomSheetComponent {
  @Output() close = new EventEmitter();

  @HostBinding('@state') state: 'opened' | 'closed' = 'closed';

  @ViewChild(BottomSheetContentDirective, { static: true })
  content: BottomSheetContentDirective;

  private _contentComponent: Type<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  @Input()
  set contentComponent(component: Type<any>) {
    this._contentComponent = component;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this._contentComponent
    );
    const viewContainerRef = this.content.viewContainerRef;
    viewContainerRef.createComponent(componentFactory);
  }
  get contentComponent(): Type<any> {
    return this._contentComponent;
  }

  scrimClicked() {
    this.close.emit();
  }
}
