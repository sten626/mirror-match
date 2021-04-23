import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlayerListItemComponent } from './new-player-list-item.component';

describe('NewPlayerListItemComponent', () => {
  let component: NewPlayerListItemComponent;
  let fixture: ComponentFixture<NewPlayerListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPlayerListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlayerListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
