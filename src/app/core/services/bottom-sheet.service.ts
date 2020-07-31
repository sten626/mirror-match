import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Injector, Type } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BottomSheetComponent } from '@app/core/components';
import { BottomSheetConfig } from './bottom-sheet-config';
import { BottomSheetElement, BottomSheetRef } from './bottom-sheet-ref';

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

  open<T>(component: Type<T>, config?: BottomSheetConfig): BottomSheetRef<T> {
    const fullConfig = this.createConfig(config);
    const bottomSheetEl = this.createBottomSheet();
    const bottomSheetRef = new BottomSheetRef(bottomSheetEl, component, fullConfig);
    return bottomSheetRef;
  }

  private createBottomSheet(): BottomSheetElement {
    const bottomSheetEl = this.document.createElement(
      'mm-bottom-sheet'
    ) as BottomSheetElement;
    this.document.body.appendChild(bottomSheetEl);

    return bottomSheetEl;
  }

  private createConfig(config: BottomSheetConfig): BottomSheetConfig {
    return {
      ...new BottomSheetConfig(),
      ...config
    };
  }
}
