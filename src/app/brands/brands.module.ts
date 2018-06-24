import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';
import { CounterUpModule } from 'angular4-counter-up';
import {SuiModule} from 'ng2-semantic-ui';

import { BrandsComponent } from './brands.component';
import { BrandComponent } from './brand/brand.component';
import { brandsRoutes } from './routes';
import { BrandDetailsComponent } from './brand-details/brand-details.component';
import { FundingComponent } from './funding/funding.component';
import { FundingDetailsComponent } from './funding-details/funding-details.component';
import { BrandFormComponent } from './brand-form/brand-form.component';
import { FundingFormComponent } from './funding-form/funding-form.component';
import { BrandService } from './services/brand.service';
import { BrandListComponent } from './brand-list/brand-list.component';
import { FundingService } from './services/funding.service';
import { BrandLogoComponent } from './brand-logo/brand-logo.component';
import { AuthGuard } from '../auth/auth.guard';
import { AuthInterceptor } from '../auth/auth.interceptor';

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
    RouterModule,
    CounterUpModule.forRoot({
      delay: 1000,
      time: 10
    }),
    SuiModule
  ],
  declarations: [BrandsComponent, BrandComponent, BrandDetailsComponent, FundingComponent, FundingDetailsComponent, BrandFormComponent, FundingFormComponent, BrandListComponent, BrandLogoComponent],
  providers: [
    BrandService,
    FundingService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class BrandsModule { }
