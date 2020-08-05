import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlayerFormComponent } from './edit-player-form.component';

describe('EditPlayerFormComponent', () => {
  let component: EditPlayerFormComponent;
  let fixture: ComponentFixture<EditPlayerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPlayerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlayerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
