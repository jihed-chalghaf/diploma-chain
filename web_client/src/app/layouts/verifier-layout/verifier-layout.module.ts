import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiplomaVerifComponent } from './pages/diploma-verif/diploma-verif.component';
import { RouterModule } from '@angular/router';
import { VerifierLayoutRoutes } from './verifier-layout.routing';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FormsModule } from "@angular/forms";
// created modules 
import { ComponentsModule } from 'app/components/components.module';
// material modules
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
// components
import { DashboardComponent } from './pages/dashboard/dashboard.component';



@NgModule({
  declarations: [
    DiplomaVerifComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(VerifierLayoutRoutes),
    FormsModule,
    ComponentsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatTooltipModule,
    DragDropModule 
  ],
})
export class VerifierLayoutModule { }
