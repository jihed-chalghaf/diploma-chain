import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DiplomaBlueprintCreateComponent} from '../diploma-blueprint-create/diploma-blueprint-create.component';
import { Diploma } from '../../../../models/diploma.model';
import { DiplomaService } from 'app/services/diploma.service';
import { Web3Service } from 'app/services/web3.service';

// temporary diploma structure (as it include different attributes)
/*interface IDiploma{
  title?: string;
  description?: string;
  university?: string;
  signature?: string;
  logo?: string;
}*/

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  createdDiplomas: Diploma[] = [];
  newDiploma: Diploma;
  constructor(
    public dialog:MatDialog,
    private diplomaService: DiplomaService,
    private web3Service: Web3Service
  ) { }

  ngOnInit(): void {
    this.getDiplomas();
  }

  // get all the diplomas issued by our university
  getDiplomas() {
    this.createdDiplomas = this.diplomaService.getDiplomas();
  }

  // will be used to add the created blueprint diploma
  issueDiploma(diploma:Diploma){
    this.diplomaService.issueDiploma(diploma);
    // update our diplomas array in real time
    this.getDiplomas();
  }

  // diploma blueprint creation dialog
  openDialog(){
    const dialogRef = this.dialog.open(DiplomaBlueprintCreateComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      // here we need to verify that all the required attributes are provided
      // before initiating the transaction and probably consuming gas!!
      if(data && data.owner && data.honors && data.logo) {
        this.newDiploma.owner = data.owner;
        this.newDiploma.issuer = this.web3Service.mainAccount;
        this.newDiploma.honors = data.honors;
        this.newDiploma.dateObtained = new Date().getTime();
        // we have 2 choices: 
        // 1- either add logo attribute in our diploma model
        // 2- remove it and always put insat's logo in the blueprint create component
        this.issueDiploma(this.newDiploma);
      }
    })
  }
}
