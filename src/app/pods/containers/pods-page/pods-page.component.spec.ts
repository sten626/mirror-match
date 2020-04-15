import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodsPageComponent } from './pods-page.component';

describe('PodsPageComponent', () => {
  let component: PodsPageComponent;
  let fixture: ComponentFixture<PodsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
