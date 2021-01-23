import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DiplomaBlueprintCreateComponent} from '../diploma-blueprint-create/diploma-blueprint-create.component';
import { Diploma } from '../../../../models/diploma.model';
import { DiplomaBluePrintService } from 'app/services/diploma-blue-print.service';
import { DiplomaService } from 'app/services/diploma.service';

import { Web3Service } from 'app/services/web3.service';

import {DiplomaBluePrint} from 'app/models/diplomaBluePrint.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  diplomaBluePrints: DiplomaBluePrint[] = [];
  pendingDiplomas:Diploma[];
  constructor(
    public dialog:MatDialog,
    private web3Service: Web3Service,
    private blueprintService:DiplomaBluePrintService,
    private diplomaService:DiplomaService
  ) { }

  ngOnInit(): void {
    this.loadBlueprints();
  }
  async loadBlueprints(){
    this.diplomaBluePrints = await this.blueprintService.getDiplomaBlueprints();
  }
  
  // diploma blueprint creation dialog
  openDialog(){
    const dialogRef = this.dialog.open(DiplomaBlueprintCreateComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(async data => {
      console.log(data);
      // here we need to verify that all the required attributes are provided
      // before initiating the transaction and probably consuming gas!!
      if(data) {
        let result = await this.blueprintService.addDiplomaBlueprint(
          data.title,
          data.description,
          data.speciality,
        );
        if(result){
          // TODO add notif 
          this.loadBlueprints()
          
        }
      }
    })
  }
}
