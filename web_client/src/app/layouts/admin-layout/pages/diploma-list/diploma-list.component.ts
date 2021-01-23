import { Component, OnInit, Input } from '@angular/core';
import { Diploma } from 'app/models/diploma.model';
import { DiplomaService } from 'app/services/diploma.service';
import { MatDialog } from "@angular/material/dialog";
import {GoDialogComponent} from 'app/components/go-dialog/go-dialog.component'
import { Bytes32 } from 'soltypes';

@Component({
  selector: 'app-diploma-list',
  templateUrl: './diploma-list.component.html',
  styleUrls: ['./diploma-list.component.css']
})
export class DiplomaListComponent implements OnInit {

  pendingDiplomas: Diploma[];
  toBeValidated:Bytes32[]=[];
  constructor(
    public dialog: MatDialog,
    private diplomaService: DiplomaService) { }

  ngOnInit(): void {
    this.toBeValidated=[];
    this.loadPendingDiplomas();
  }
  async loadPendingDiplomas(){
    this.pendingDiplomas = await this.diplomaService.getPendingDiplomas();
  }
  addRequest(id){
    // add the request to be validated
    this.toBeValidated.push(id)
  } 
  removeRequest(id){
    // add the request to be validated
    this.toBeValidated = this.toBeValidated.filter(element=> element!=id);
  } 

  validateRequests(){
    // code to validate all selected requests

    const dialogRef = this.dialog.open(GoDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe( res => {
      if(res) {
        // validate the selected requests    
        this.toBeValidated.forEach(async requestId=> {
          let result = await this.diplomaService.validateDiploma(requestId)
          console.log(result)
        })
        this.loadPendingDiplomas();
      }
    });
  }
}
