import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DiplomaComponent } from './pages/diploma/diploma.component';
import { DiplomaListComponent } from './pages/diploma-list/diploma-list.component';
import { DiplomaRequestComponent } from './pages/diploma-request/diploma-request.component';
import { RouterModule } from '@angular/router';
import { StudentLayoutRoutes } from './student-layout.routing';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    DashboardComponent, 
    DiplomaComponent, 
    DiplomaListComponent, 
    DiplomaRequestComponent
  ],
  entryComponents: [
    DiplomaRequestComponent
  ],

  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    RouterModule.forChild(StudentLayoutRoutes)
  ]
})
export class StudentLayoutModule { }
