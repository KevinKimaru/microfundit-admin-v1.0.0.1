import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';

import { CharitiesComponent } from './charities.component';
import { charitiesRoutes } from './routes';
import { CharityDetailsComponent } from './charity-details/charity-details.component';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { CharityListComponent } from './charity-list/charity-list.component';
import { CharityService } from './services/charity.service';
import { StoryService } from './services/story.service';
import { CharityFormComponent } from './charity-form/charity-form.component';
import { StoryFormComponent } from './story-form/story-form.component';
import { StoryLogoComponent } from './story-logo/story-logo.component';
import { StoryImagesComponent } from './story-images/story-images.component';
import { CharityLogoComponent } from './charity-logo/charity-logo.component';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule
  ], 
  declarations: [CharitiesComponent, CharityDetailsComponent, StoryDetailsComponent, CharityListComponent, CharityFormComponent, StoryFormComponent, StoryLogoComponent, StoryImagesComponent, CharityLogoComponent],
  providers: [
    CharityService,
    StoryService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CharitiesModule { }
