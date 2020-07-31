import { AnimationEvent } from '@angular/animations';
import { NgElement, WithProperties } from '@angular/elements';
import { BottomSheetComponent } from '@app/core/components';
import { Type } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export type BottomSheetElement = NgElement & WithProperties<BottomSheetComponent>;

export class BottomSheetRef<T, R = any> {
  private afterDismissedSubject = new Subject<R>();
  // private result: R | undefined;

  constructor(
    public element: BottomSheetElement,
    contentComponent: Type<T>
  ) {
    element.contentComponent = contentComponent;

    element.addEventListener('animationStateChanged', (event: CustomEvent) => {
      const animationEvent = event.detail as AnimationEvent;
      if (
        animationEvent.phaseName === 'done' &&
        animationEvent.toState === 'hidden'
      ) {
        document.body.removeChild(element);
      }
    });

    element.addEventListener('scrimClicked', () => {
      this.dismiss();
    });
  }

  afterDismissed(): Observable<R | undefined> {
    return this.afterDismissedSubject.asObservable();
  }

  dismiss(result?: R) {
    // this.result = result;
    this.element.state = 'hidden';
    this.afterDismissedSubject.next(result);
    this.afterDismissedSubject.complete();
  }
}
