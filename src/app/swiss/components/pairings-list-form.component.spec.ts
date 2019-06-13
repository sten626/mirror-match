import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PairingsListFormComponent } from './pairings-list-form.component';

describe('PairingsListFormComponent', () => {
  let component: PairingsListFormComponent;
  let fixture: ComponentFixture<PairingsListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PairingsListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairingsListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
