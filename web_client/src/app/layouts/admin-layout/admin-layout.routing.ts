import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DiplomaIssueComponent } from './pages/diploma-issue/diploma-issue.component';
import { DiplomaListComponent } from './pages/diploma-list/diploma-list.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { DiplomaBlueprintCreateComponent } from './pages/diploma-blueprint-create/diploma-blueprint-create.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'diploma-issue',
        component: DiplomaIssueComponent
    },
    {
        path: 'diplomas',
        component: DiplomaListComponent
    },
    {
        path: 'students',
        component: StudentListComponent
    },
    // remove this component as it will be used within a dialog
    /*{
        path: 'diploma-blueprint-create',
        component: DiplomaBlueprintCreateComponent
    },*/ 
    {
        path: '',
        pathMatch: "full",
        redirectTo: 'dashboard'
    },
   /*  {
        path: '**',
        redirectTo: ''
    } */
];
