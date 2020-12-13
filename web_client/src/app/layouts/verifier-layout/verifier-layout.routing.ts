import { Routes } from '@angular/router';

import { DiplomaVerifComponent } from './pages/diploma-verif/diploma-verif.component';

export const VerifierLayoutRoutes: Routes = [
    {
        path: 'diploma/:id/verify',
        component: DiplomaVerifComponent
    }
];