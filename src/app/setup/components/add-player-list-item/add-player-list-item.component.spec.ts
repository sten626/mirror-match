import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayerListItemComponent } from './add-player-list-item.component';

describe('AddPlayerListItemComponent', () => {
  let component: AddPlayerListItemComponent;
  let fixture: ComponentFixture<AddPlayerListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlayerListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayerListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
