import { Routes } from "@angular/router";
import { DonorsComponent } from "./donors.component";
import { DonorDetailsComponent } from "./donor-details/donor-details.component";
import { DonorListComponent } from "./donor-list/donor-list.component";
import { AuthGuard } from "../auth/auth.guard";


export const donorsRoutes: Routes = [
    { path: '', component: DonorListComponent, canActivate: [AuthGuard] },
    { path: ':donor', component: DonorDetailsComponent, canActivate: [AuthGuard] },
];