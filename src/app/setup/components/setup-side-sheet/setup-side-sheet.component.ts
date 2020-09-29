import { AnimationEvent } from '@angular/animations';
import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnDestroy
} from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { animations } from './setup-side-sheet.animations';

export type SideSheetMode = 'standard' | 'modal';

function hasModifierKey(event: KeyboardEvent): boolean {
  return event.altKey || event.ctrlKey || event.shiftKey || event.metaKey;
}

@Component({
  selector: 'mm-setup-side-sheet',
  templateUrl: './setup-side-sheet.component.html',
  styleUrls: ['./setup-side-sheet.component.scss'],
  animations: animations
})
export class SetupSideSheetComponent implements OnDestroy {
  @Input() mode: SideSheetMode = 'modal';
  @Input() opened = false;
  @Input() recommendedTotalRounds: number;

  private animationEnd = new Subject<AnimationEvent>();

  constructor(elementRef: ElementRef, ngZone: NgZone) {
    ngZone.runOutsideAngular(() => {
      (fromEvent(elementRef.nativeElement, 'keydown') as Observable<
        KeyboardEvent
      >)
        .pipe(
          filter((event) => event.key === 'Escape' && !hasModifierKey(event))
        )
        .subscribe((event) =>
          ngZone.run(() => {
            this.close();
            event.stopPropagation();
            event.preventDefault();
          })
        );
    });

    this.animationEnd
      .pipe(
        distinctUntilChanged(
          (a, b) => a.fromState === b.fromState && a.toState === b.toState
        )
      )
      .subscribe((event) => {
        const { toState } = event;

        if (toState === 'open') {
          const element = elementRef.nativeElement as HTMLElement;
          const input = element.querySelector('input');

          if (input) {
            input.focus();
          }
        }
      });
  }

  @HostBinding('class.mm-side-sheet--modal') get modal() {
    return this.mode === 'modal';
  }

  ngOnDestroy() {
    this.animationEnd.complete();
  }

  animationDoneListener(event: AnimationEvent) {
    this.animationEnd.next(event);
  }

  close() {
    this.toggle(false);
  }

  open() {
    this.toggle(true);
  }

  toggle(isOpen = !this.opened) {
    this.opened = isOpen;
  }
}
