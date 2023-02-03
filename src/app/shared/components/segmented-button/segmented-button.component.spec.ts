import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentedButtonComponent } from './segmented-button.component';

describe('SegmentedButtonComponent', () => {
  let component: SegmentedButtonComponent;
  let fixture: ComponentFixture<SegmentedButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentedButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegmentedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
