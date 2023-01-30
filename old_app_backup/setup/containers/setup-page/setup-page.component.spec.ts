import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetupPageComponent } from './setup-page.component';

@Component({ selector: 'mm-top-app-bar', template: '' })
class TopAppBarStubComponent {}

@Component({ selector: 'mm-card', template: '' })
class CardStubComponent {
  @Input() disabled = false;
}

describe('SetupComponent', () => {
  let component: SetupPageComponent;
  let fixture: ComponentFixture<SetupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SetupPageComponent,
        CardStubComponent,
        TopAppBarStubComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
