import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Injector, Type } from '@angular/core';
import {
  createCustomElement,
  NgElement,
  WithProperties
} from '@angular/elements';
import { BottomSheetComponent } from '@app/core/components';

@Injectable({
  providedIn: 'root'
})
export class BottomSheetService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    injector: Injector
  ) {
    const bottomSheetElement = createCustomElement(BottomSheetComponent, {
      injector
    });
    customElements.define('mm-bottom-sheet', bottomSheetElement);
  }

  open(component: Type<any>) {
    const bottomSheetEl = this.document.createElement(
      'mm-bottom-sheet'
    ) as NgElement & WithProperties<BottomSheetComponent>;
    this.document.body.appendChild(bottomSheetEl);
    bottomSheetEl.contentComponent = component;

    bottomSheetEl.addEventListener('close', () =>
      document.body.removeChild(bottomSheetEl)
    );
  }
}
