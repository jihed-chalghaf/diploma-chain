import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';

import { AdminLayoutRoutes } from './admin-layout.routing';
// created modules 
import { ComponentsModule } from 'app/components/components.module';
// created components
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { DiplomaIssueComponent,DiplomaHolderDialog } from './pages/diploma-issue/diploma-issue.component';
import { DiplomaListComponent } from './pages/diploma-list/diploma-list.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { DiplomaBlueprintCreateComponent } from './pages/diploma-blueprint-create/diploma-blueprint-create.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ComponentsModule,
    MatDialogModule
  ],
  entryComponents: [
    DiplomaHolderDialog,
    DiplomaBlueprintCreateComponent
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    DiplomaIssueComponent,
    DiplomaListComponent,
    StudentListComponent,
    DiplomaBlueprintCreateComponent,
    DiplomaHolderDialog
  ]
})

export class AdminLayoutModule {}
