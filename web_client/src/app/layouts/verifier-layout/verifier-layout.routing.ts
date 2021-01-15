import { Routes } from '@angular/router';

import { DiplomaVerifComponent } from './pages/diploma-verif/diploma-verif.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const VerifierLayoutRoutes: Routes = [

    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: '',
        pathMatch: "full",
        redirectTo: 'dashboard'
    }
];