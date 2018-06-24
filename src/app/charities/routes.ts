import { Routes } from "@angular/router";
import { CharitiesComponent } from "./charities.component";
import { CharityDetailsComponent } from "./charity-details/charity-details.component";
import { StoryDetailsComponent } from "./story-details/story-details.component";
import { CharityListComponent } from "./charity-list/charity-list.component";
import { AuthGuard } from "../auth/auth.guard";

export const charitiesRoutes: Routes = [
    { path: '', component: CharityListComponent, canActivate: [AuthGuard]},
    { path: ':charity', component: CharityDetailsComponent, canActivate: [AuthGuard]},
    { path: ':charity:/:story', component: StoryDetailsComponent, canActivate: [AuthGuard]},
]; 