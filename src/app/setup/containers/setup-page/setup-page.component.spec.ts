import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SetupPageComponent } from '@app/setup/containers/setup-page/setup-page.component';

describe('SetupPageComponent', () => {
  let component: SetupPageComponent;
  let fixture: ComponentFixture<SetupPageComponent>;

  // tslint:disable-next-line: component-selector
  @Component({selector: 'router-outlet', template: ''})
  class RouterOutletStubComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RouterOutletStubComponent,
        SetupPageComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
