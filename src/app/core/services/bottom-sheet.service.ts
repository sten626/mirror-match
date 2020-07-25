import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BottomSheetContainerComponent } from '@app/core/components';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class BottomSheetService {
  constructor(private overlay: Overlay) {}

  open() {
    const overlayRef = this.createOverlay();
    // const bottomSheetContainer = this.attachBottomSheetContainer(overlayRef);
    this.attachBottomSheetContainer(overlayRef);
  }

  private attachBottomSheetContainer(overlay: OverlayRef): BottomSheetContainerComponent {
    const containerPortal = new ComponentPortal(BottomSheetContainerComponent);
    const containerRef = overlay.attach(containerPortal);

    return containerRef.instance;
  }

  private createOverlay(): OverlayRef {
    const overlayConfig = this.getOverlayConfig();
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(): OverlayConfig {
    const config = new OverlayConfig({
      hasBackdrop: true,
      minHeight: '56px',
      positionStrategy: this.overlay.position().global().bottom('0').left('0'),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      width: '100%'
    });

    return config;
  }
}
