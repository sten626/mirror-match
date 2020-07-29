import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import {
  Injectable,
  InjectionToken,
  Injector,
  StaticProvider
} from '@angular/core';
import { BottomSheetContainerComponent } from '@app/core/components';
import { BottomSheetConfig } from './bottom-sheet-config';

class BottomSheetRef<T> {
  componentInstance: T;

  constructor(
    private overlayRef: OverlayRef,
    public containerInstance: BottomSheetContainerComponent
  ) {
    this.overlayRef.detachments().subscribe(() => {
      // TODO
      return;
    });
  }
}

export const BOTTOM_SHEET_DATA = new InjectionToken<any>('BottomSheetData');

@Injectable({
  providedIn: 'root'
})
export class BottomSheetService {
  constructor(private injector: Injector, private overlay: Overlay) {}

  open<T>(
    component: ComponentType<T>,
    config?: BottomSheetConfig
  ): BottomSheetRef<T> {
    config = { ...new BottomSheetConfig(), ...config };
    const overlayRef = this.createOverlay(config);
    const bottomSheetContainer = this.attachBottomSheetContainer(
      overlayRef,
      config
    );
    const bottomSheetRef = this.attachBottomSheetContent(
      component,
      bottomSheetContainer,
      overlayRef,
      config
    );

    return bottomSheetRef;
  }

  private attachBottomSheetContainer(
    overlay: OverlayRef,
    config: BottomSheetConfig
  ): BottomSheetContainerComponent {
    const injector = Injector.create({
      parent: this.injector,
      providers: [{ provide: BottomSheetConfig, useValue: config }]
    });
    const containerPortal = new ComponentPortal(
      BottomSheetContainerComponent,
      null,
      injector
    );
    const containerRef = overlay.attach<BottomSheetContainerComponent>(
      containerPortal
    );

    return containerRef.instance;
  }

  private attachBottomSheetContent<T>(
    component: ComponentType<T>,
    bottomSheetContainer: BottomSheetContainerComponent,
    overlayRef: OverlayRef,
    config: BottomSheetConfig
  ): BottomSheetRef<T> {
    const bottomSheetRef = new BottomSheetRef<T>(
      overlayRef,
      bottomSheetContainer
    );
    const injector = this.createInjector<T>(
      config,
      bottomSheetRef,
      bottomSheetContainer
    );
    const componentPortal = new ComponentPortal(component, null, injector);
    const contentRef = bottomSheetContainer.attachComponentPortal<T>(
      componentPortal
    );
    bottomSheetRef.componentInstance = contentRef.instance;

    return bottomSheetRef;
  }

  private createInjector<T>(
    config: BottomSheetConfig,
    bottomSheetRef: BottomSheetRef<T>,
    bottomSheetContainer: BottomSheetContainerComponent
  ): Injector {
    const providers: StaticProvider[] = [
      {
        provide: BottomSheetContainerComponent,
        useValue: bottomSheetContainer
      },
      { provide: BOTTOM_SHEET_DATA, useValue: config.data },
      { provide: BottomSheetRef, useValue: bottomSheetRef }
    ];

    return Injector.create({ parent: this.injector, providers });
  }

  private createOverlay(config: BottomSheetConfig): OverlayRef {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(
    bottomSheetConfig: BottomSheetConfig
  ): OverlayConfig {
    const config = new OverlayConfig({
      hasBackdrop: bottomSheetConfig.hasBackdrop,
      minHeight: bottomSheetConfig.minHeight,
      positionStrategy: this.overlay.position().global().bottom('0').left('0'),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      width: bottomSheetConfig.width
    });

    return config;
  }
}
