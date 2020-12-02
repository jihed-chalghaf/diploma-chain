import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentLayoutComponent } from './student-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DiplomaComponent } from './pages/diploma/diploma.component';
import { DiplomaListComponent } from './pages/diploma-list/diploma-list.component';
import { DiplomaRequestComponent } from './pages/diploma-request/diploma-request.component';



@NgModule({
  declarations: [
    StudentLayoutComponent, 
    DashboardComponent, 
    DiplomaComponent, 
    DiplomaListComponent, 
    DiplomaRequestComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StudentLayoutModule { }
