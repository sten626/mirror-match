import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopAppBarComponent } from './top-app-bar.component';

describe('TopAppBarComponent', () => {
  let component: TopAppBarComponent;
  let fixture: ComponentFixture<TopAppBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopAppBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAppBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onScroll', () => {
    it('should set scrolled to false when window position at 0', () => {
      spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(0);
      component.onScroll();
      expect(component.scrolled).toBeFalse();
    });
  });

  describe('onScroll', () => {
    it('should set scrolled to true when window position at 1', () => {
      spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(1);
      component.onScroll();
      expect(component.scrolled).toBeTrue();
    });
  });
});
