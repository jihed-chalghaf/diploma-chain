import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { StudentLayoutComponent } from './layouts/student-layout/student-layout.component';
import { VerifierLayoutComponent } from './layouts/verifier-layout/verifier-layout.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes =[
  {
    path: 'admin',
    component: AdminLayoutComponent,
//    canActivate: [AuthGuard],
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  },
  {
    path: 'student',
    component: StudentLayoutComponent,
//    canActivate: [AuthGuard],
    children: [{
      path: '',
      loadChildren: './layouts/student-layout/student-layout.module#StudentLayoutModule'
    }]
  },
  {
    path: 'verifier',
    component: VerifierLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/verifier-layout/verifier-layout.module#VerifierLayoutModule'
    }]
  },
  {
    path: '',
    pathMatch: "full",
    component: LandingComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
