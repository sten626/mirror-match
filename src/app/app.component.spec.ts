import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

@Component({ selector: 'mm-layout-footer', template: '' })
class LayoutFooterComponentStub {}

@Component({ selector: 'mm-layout-header', template: '' })
class LayoutHeaderComponentStub {}

@Component({ selector: 'router-outlet', template: '' })
class RouterOutletComponentStub {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LayoutFooterComponentStub,
        LayoutHeaderComponentStub,
        RouterOutletComponentStub,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
