import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifierLayoutComponent } from './verifier-layout.component';
import { DiplomaVerifComponent } from './pages/diploma-verif/diploma-verif.component';



@NgModule({
  declarations: [
    VerifierLayoutComponent, 
    DiplomaVerifComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VerifierLayoutModule { }
