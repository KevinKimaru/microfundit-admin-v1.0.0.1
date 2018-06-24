import { Routes } from "@angular/router";
import { BrandsComponent } from "./brands/brands.component";
import { brandsRoutes } from "./brands/routes";
import { AppComponent } from "./app.component";
import { CharitiesComponent } from "./charities/charities.component";
import { charitiesRoutes } from "./charities/routes";
import { DonorsComponent } from "./donors/donors.component";
import { donorsRoutes } from "./donors/routes";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./auth/auth.guard";
import { AuthComponent } from "./auth/auth.component";


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'brands', component: BrandsComponent, children: brandsRoutes, canActivate: [AuthGuard]},
    { path: 'charities', component: CharitiesComponent, children: charitiesRoutes, canActivate: [AuthGuard]},
    { path: 'donors', component: DonorsComponent, children: donorsRoutes, canActivate: [AuthGuard]},
    { path: 'home', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'login', component: AuthComponent}
];