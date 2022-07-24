import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetupComponent } from './setup.component';

@Component({ selector: 'mm-top-app-bar', template: '' })
class TopAppBarStubComponent {}

@Component({ selector: 'mm-card', template: '' })
class CardStubComponent {}

describe('SetupComponent', () => {
  let component: SetupComponent;
  let fixture: ComponentFixture<SetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetupComponent, CardStubComponent, TopAppBarStubComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
