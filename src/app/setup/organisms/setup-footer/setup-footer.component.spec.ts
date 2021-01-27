import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupFooterComponent } from './setup-footer.component';

describe('SetupFooterComponent', () => {
  let component: SetupFooterComponent;
  let fixture: ComponentFixture<SetupFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
