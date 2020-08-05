import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlayerPageComponent } from './edit-player-page.component';

describe('EditPlayerPageComponent', () => {
  let component: EditPlayerPageComponent;
  let fixture: ComponentFixture<EditPlayerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPlayerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlayerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
