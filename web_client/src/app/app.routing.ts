import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
// High abstraction Components
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { StudentLayoutComponent } from './layouts/student-layout/student-layout.component';
import { VerifierLayoutComponent } from './layouts/verifier-layout/verifier-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LandingComponent } from './pages/landing/landing.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { StudentGuard } from './guards/student.guard';
import { UnauthGuard } from './guards/unauth.guard';


const routes: Routes =[
  {
    path: 'admin',
    component: AdminLayoutComponent,
//    canActivate: [AuthGuard, AdminGuard],
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  },
  {
    path: 'student',
    component: StudentLayoutComponent,
//    canActivate: [AuthGuard, StudentGuard],
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
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [UnauthGuard],
    children: [{
      path: '',
      loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
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
