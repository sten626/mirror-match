import { BottomSheetComponent } from '@app/core/components';
import { Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Type, ApplicationRef, ComponentRef, Injector } from '@angular/core';

export class BottomSheetRef<R = any> {
  private afterDismissedSubject = new Subject<R>();
  // private result: R | undefined;

  constructor(
    private applicationRef: ApplicationRef,
    private componentRef: ComponentRef<BottomSheetComponent>,
    private document: Document,
    host: HTMLElement,
    // private instance: BottomSheetComponent
  ) {
    // instance.contentComponent = contentComponent;

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
    // this.result = result;
    this.componentRef.instance.state = 'hidden';
    this.afterDismissedSubject.next(result);
    this.afterDismissedSubject.complete();
  }
}
