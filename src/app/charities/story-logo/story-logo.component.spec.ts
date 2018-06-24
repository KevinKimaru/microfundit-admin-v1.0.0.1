import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryLogoComponent } from './story-logo.component';

describe('StoryLogoComponent', () => {
  let component: StoryLogoComponent;
  let fixture: ComponentFixture<StoryLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
