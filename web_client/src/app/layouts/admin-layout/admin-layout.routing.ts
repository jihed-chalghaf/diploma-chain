import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
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
    {
        path: 'diploma-blueprint-create',
        component: DiplomaBlueprintCreateComponent
    },
    {
        path: '',
        redirectTo: 'dashboard'
    }
];
