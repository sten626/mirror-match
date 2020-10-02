import { AnimationEvent } from '@angular/animations';
import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { animations } from './setup-side-sheet.animations';

export type SideSheetMode = 'standard' | 'modal';

function hasModifierKey(event: KeyboardEvent): boolean {
  return event.altKey || event.ctrlKey || event.shiftKey || event.metaKey;
}

interface Point {
  x: number;
  y: number;
}

function getGesturePointFromEvent(event: PointerEvent): Point {
  const point: Point = {
    x: event.clientX,
    y: event.clientY
  };

  return point;
}

@Component({
  selector: 'mm-setup-side-sheet',
  templateUrl: './setup-side-sheet.component.html',
  styleUrls: ['./setup-side-sheet.component.scss'],
  animations: animations
})
export class SetupSideSheetComponent implements OnChanges, OnDestroy {
  @Input() mode: SideSheetMode = 'modal';
  @Input() recommendedTotalRounds: number;

  opened = false;

  @ViewChild('drawer')
  private drawerEl: ElementRef<HTMLElement>;

  private animationEnd = new Subject<AnimationEvent>();
  private initialTouchPosition: Point = null;
  private slopValue: number = null;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private ngZone: NgZone
  ) {
    this.setupKeydownListener();

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

  ngOnChanges() {
    if (this.mode === 'standard') {
      this.opened = false;
    }
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

  @HostListener('pointerdown', ['$event'])
  handleGestureStart(event: PointerEvent) {
    event.preventDefault();
    this.slopValue = this.drawerEl.nativeElement.clientWidth / 4;
    this.initialTouchPosition = getGesturePointFromEvent(event);
  }

  @HostListener('pointercancel', ['$event'])
  @HostListener('pointerup', ['$event'])
  handleGestureEnd(event: PointerEvent) {
    event.preventDefault();
    const currentPosition = getGesturePointFromEvent(event);
    const differenceX = currentPosition.x - this.initialTouchPosition.x;

    if (differenceX > this.slopValue) {
      this.close();
    }

    this.initialTouchPosition = null;
  }

  open() {
    this.toggle(true);
  }

  toggle(isOpen = !this.opened) {
    this.opened = isOpen;
  }

  private setupKeydownListener() {
    this.ngZone.runOutsideAngular(() => {
      (fromEvent(this.elementRef.nativeElement, 'keydown') as Observable<
        KeyboardEvent
      >)
        .pipe(
          filter((event) => event.key === 'Escape' && !hasModifierKey(event))
        )
        .subscribe((event) =>
          this.ngZone.run(() => {
            this.close();
            event.stopPropagation();
            event.preventDefault();
          })
        );
    });
  }
}
