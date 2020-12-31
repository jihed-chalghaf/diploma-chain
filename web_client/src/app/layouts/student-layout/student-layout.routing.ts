import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DiplomaComponent } from './pages/diploma/diploma.component';
import { DiplomaListComponent } from './pages/diploma-list/diploma-list.component';
import { DiplomaRequestComponent } from './pages/diploma-request/diploma-request.component';

export const StudentLayoutRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'diploma/:id',
        component: DiplomaComponent
    },
    {
        path: 'diplomas',
        component: DiplomaListComponent
    },
    {
        path: 'diploma-request',
        component: DiplomaRequestComponent
    },
    {
        path: '',
        pathMatch: "full",
        redirectTo: 'dashboard'
    }
];