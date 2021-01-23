import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { GoDialogComponent } from './go-dialog/go-dialog.component';

import {MatDialogModule} from '@angular/material/dialog'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ChecklistComponent,
    GoDialogComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ChecklistComponent
  ]
})
export class ComponentsModule { }
