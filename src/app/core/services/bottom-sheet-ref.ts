import { ApplicationRef, ComponentRef, Injector, Type } from '@angular/core';
import { BottomSheetComponent } from '@mm/core/components';
import { Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

export class BottomSheetRef<R = any> {
  private afterDismissedSubject = new Subject<R>();

  constructor(
    private applicationRef: ApplicationRef,
    private componentRef: ComponentRef<BottomSheetComponent>,
    private document: Document,
    host: HTMLElement
  ) {
    componentRef.instance.animationStateChanged
      .pipe(
        filter(
          (event) => event.phaseName === 'done' && event.toState === 'hidden'
        ),
        take(1)
      )
      .subscribe(() => {
        this.document.body.removeChild(host);
        this.applicationRef.detachView(componentRef.hostView);
      });

    componentRef.instance.scrimClicked.subscribe(() => this.dismiss());
  }

  afterDismissed(): Observable<R | undefined> {
    return this.afterDismissedSubject.asObservable();
  }

  attach<T>(component: Type<T>, injector: Injector) {
    this.componentRef.instance.attach(component, injector);
  }

  dismiss(result?: R) {
    this.componentRef.instance.state = 'hidden';
    this.afterDismissedSubject.next(result);
    this.afterDismissedSubject.complete();
  }
}
