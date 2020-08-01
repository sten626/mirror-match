import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
  StaticProvider,
  Type
} from '@angular/core';
import { BottomSheetComponent } from '@mm/core/components';
import { BottomSheetConfig, BOTTOM_SHEET_DATA } from './bottom-sheet-config';
import { BottomSheetRef } from './bottom-sheet-ref';

@Injectable({
  providedIn: 'root'
})
export class BottomSheetService {
  constructor(
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) private document: Document,
    private injector: Injector
  ) {
    // const bottomSheetElement = createCustomElement(BottomSheetComponent, {
    //   injector
    // });
    // customElements.define('mm-bottom-sheet', bottomSheetElement);
  }

  open<T>(component: Type<T>, config?: BottomSheetConfig): BottomSheetRef {
    const fullConfig = this.createConfig(config);
    const bottomSheetRef = this.createBottomSheet();
    const injector = this.createInjector(fullConfig, bottomSheetRef);
    bottomSheetRef.attach(component, injector);
    // const bottomSheetRef = new BottomSheetRef(bottomSheetEl, component);
    return bottomSheetRef;
  }

  private createBottomSheet(): BottomSheetRef {
    const bottomSheetEl = this.document.createElement('mm-bottom-sheet');
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      BottomSheetComponent
    );
    const bottomSheetComponentRef = factory.create(
      this.injector,
      [],
      bottomSheetEl
    );
    this.applicationRef.attachView(bottomSheetComponentRef.hostView);
    document.body.appendChild(bottomSheetEl);

    return new BottomSheetRef(
      this.applicationRef,
      bottomSheetComponentRef,
      this.document,
      bottomSheetEl
    );
  }

  private createConfig(config: BottomSheetConfig): BottomSheetConfig {
    return {
      ...new BottomSheetConfig(),
      ...config
    };
  }

  private createInjector(
    config: BottomSheetConfig,
    bottomSheetRef: BottomSheetRef
  ): Injector {
    const providers: StaticProvider[] = [
      { provide: BottomSheetRef, useValue: bottomSheetRef },
      { provide: BOTTOM_SHEET_DATA, useValue: config.data }
    ];

    return Injector.create({ parent: this.injector, providers });
  }
}
