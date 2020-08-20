import { ApplicationRef, ComponentRef, Injector, Type } from '@angular/core';
import { BottomSheetComponent } from '@mm/core/components';
import { Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

export class BottomSheetRef<R = any> {
  private afterDismissedSubject = new Subject<R>();
  private previousScrollTop: number;

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

  disableScrollBlock() {
    const documentElement = this.document.documentElement;
    documentElement.style.top = '';
    documentElement.classList.remove('mm-scroll-block');
    documentElement.scroll(0, this.previousScrollTop);
    this.previousScrollTop = 0;
  }

  dismiss(result?: R) {
    this.componentRef.instance.state = 'hidden';
    this.disableScrollBlock();
    this.afterDismissedSubject.next(result);
    this.afterDismissedSubject.complete();
  }

  enableScrollBlock() {
    const documentElement = this.document.documentElement;
    const documentRect = documentElement.getBoundingClientRect();
    this.previousScrollTop = -documentRect.top;
    documentElement.style.top = `${-this.previousScrollTop}px`;
    documentElement.classList.add('mm-scroll-block');
  }
}
