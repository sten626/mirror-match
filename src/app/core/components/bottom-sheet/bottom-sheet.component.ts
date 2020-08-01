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
  ViewChild,
  Injector
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

  private contentComponent: Type<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @HostListener('@state.done', ['$event'])
  onAnimationDone(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  attach<T>(component: Type<T>, injector: Injector) {
    this.contentComponent = component;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.contentComponent
    );
    const viewContainerRef = this.content.viewContainerRef;
    viewContainerRef.createComponent(componentFactory, null, injector);
  }
}
