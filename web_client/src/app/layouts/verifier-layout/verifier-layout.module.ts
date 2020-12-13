import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiplomaVerifComponent } from './pages/diploma-verif/diploma-verif.component';
import { RouterModule } from '@angular/router';
import { VerifierLayoutRoutes } from './verifier-layout.routing';



@NgModule({
  declarations: [
    DiplomaVerifComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(VerifierLayoutRoutes)
  ]
})
export class VerifierLayoutModule { }
