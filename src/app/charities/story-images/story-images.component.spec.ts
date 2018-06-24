import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryImagesComponent } from './story-images.component';

describe('StoryImagesComponent', () => {
  let component: StoryImagesComponent;
  let fixture: ComponentFixture<StoryImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
