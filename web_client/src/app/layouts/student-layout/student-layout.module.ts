import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DiplomaComponent } from './pages/diploma/diploma.component';
import { DiplomaListComponent } from './pages/diploma-list/diploma-list.component';
import { DiplomaRequestComponent } from './pages/diploma-request/diploma-request.component';
import { RouterModule } from '@angular/router';
import { StudentLayoutRoutes } from './student-layout.routing';



@NgModule({
  declarations: [
    DashboardComponent, 
    DiplomaComponent, 
    DiplomaListComponent, 
    DiplomaRequestComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(StudentLayoutRoutes)
  ]
})
export class StudentLayoutModule { }
