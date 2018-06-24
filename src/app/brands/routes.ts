import { Routes } from "@angular/router";
import { BrandsComponent } from "./brands.component";
import { BrandDetailsComponent } from "./brand-details/brand-details.component";
import { FundingDetailsComponent } from "./funding-details/funding-details.component";
import { BrandListComponent } from "./brand-list/brand-list.component";
import { AuthGuard } from "../auth/auth.guard";

export const brandsRoutes: Routes = [
    // { path: '', redirectTo: 'brand-list', pathMatch: 'full' },
    { path: '', component: BrandListComponent, canActivate: [AuthGuard]},
    { path: ':brand', component: BrandDetailsComponent, canActivate: [AuthGuard]},
    { path: ':brand/:funding', component: FundingDetailsComponent, canActivate: [AuthGuard]},
];