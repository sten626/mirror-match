import { animate, style, transition, trigger } from '@angular/animations';
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
  ViewChild
} from '@angular/core';

@Component({
  selector: 'mm-bottom-sheet-container',
  templateUrl: './bottom-sheet-container.component.html',
  styleUrls: ['./bottom-sheet-container.component.scss'],
  animations: [
    trigger('backdrop', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class BottomSheetContainerComponent extends BasePortalOutlet {
  @Output() close = new EventEmitter();
  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet: CdkPortalOutlet;

  constructor() {
    super();
  }

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    return this.portalOutlet.attachComponentPortal(portal);
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    portal = portal;
    throw new Error('Method not implemented.');
  }
}
