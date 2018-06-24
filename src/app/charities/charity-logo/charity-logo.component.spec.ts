import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityLogoComponent } from './charity-logo.component';

describe('CharityLogoComponent', () => {
  let component: CharityLogoComponent;
  let fixture: ComponentFixture<CharityLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharityLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharityLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
