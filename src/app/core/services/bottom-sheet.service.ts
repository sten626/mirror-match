import { Injectable, Injector } from '@angular/core';
import {
  createCustomElement,
  NgElement,
  WithProperties
} from '@angular/elements';
import { BottomSheetContainerComponent } from '@app/core/components';

@Injectable({
  providedIn: 'root'
})
export class BottomSheetService {
  constructor(injector: Injector) {
    const bottomSheetContainerEl = createCustomElement(
      BottomSheetContainerComponent,
      { injector }
    );
    customElements.define('mm-bottom-sheet-container', bottomSheetContainerEl);
  }

  open() {
    this.createContainer();
  }

  private createContainer() {
    const bottomSheetContainerEl: NgElement &
      WithProperties<BottomSheetContainerComponent> = document.createElement(
      'mm-bottom-sheet-container'
    ) as any;
    bottomSheetContainerEl.addEventListener('close', () =>
      document.body.removeChild(bottomSheetContainerEl)
    );
    document.body.appendChild(bottomSheetContainerEl);
  }
}
