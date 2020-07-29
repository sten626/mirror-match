import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
  TemplatePortal
} from '@angular/cdk/portal';
import {
  Component,
  ComponentRef,
  EmbeddedViewRef,
  EventEmitter,
  Output,
  ViewChild,
  HostBinding,
  HostListener
} from '@angular/core';
import { bottomSheetContainer } from './bottom-sheet-container-animations';

@Component({
  selector: 'mm-bottom-sheet-container',
  templateUrl: './bottom-sheet-container.component.html',
  styleUrls: ['./bottom-sheet-container.component.scss'],
  animations: [bottomSheetContainer]
})
export class BottomSheetContainerComponent extends BasePortalOutlet {
  @Output() close = new EventEmitter();
  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet: CdkPortalOutlet;

  @HostBinding('@bottomSheetContainer')
  state: 'void' | 'enter' | 'exit' = 'enter';

  constructor() {
    super();
  }

  @HostListener('@bottomSheetContainer.start')
  onAnimationStart(event: AnimationEvent) {
    console.log(event);
  }

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    return this.portalOutlet.attachComponentPortal(portal);
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    portal = portal;
    throw new Error('Method not implemented.');
  }
}
