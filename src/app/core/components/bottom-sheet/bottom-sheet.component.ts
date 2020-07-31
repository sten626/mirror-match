import { AnimationEvent } from '@angular/animations';
import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  HostBinding,
  HostListener,
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
  @Output() animationStateChanged = new EventEmitter<AnimationEvent>();
  @Output() scrimClicked = new EventEmitter();

  @Input()
  @HostBinding('@state') state: 'showing' | 'hidden' = 'showing';

  @ViewChild(BottomSheetContentDirective, { static: true })
  content: BottomSheetContentDirective;

  private _contentComponent: Type<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

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

  @HostListener('@state.done', ['$event'])
  onAnimationDone(event: AnimationEvent) {
    console.log(`done ${event}`);
    this.animationStateChanged.emit(event);
  }

  // scrimClicked() {
  //   this.state = 'hidden';
  //   // this.changeDetectorRef.markForCheck();
  // }
}
