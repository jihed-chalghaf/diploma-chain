import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DiplomaBlueprintCreateComponent} from '../diploma-blueprint-create/diploma-blueprint-create.component';

// temporary diploma structure (as it include different attributes)
interface Diploma{
  title?: string;
  description?: string;
  university?: string;
  signature?: string;
  logo?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  createdDiplomas= [];
  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
    this.createdDiplomas=[
      {
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },{
        title:"test",
        description:"test",
        university:"test",
        signature:"test",
      },
    ]
  }

  // will be used to add the created blueprint diploma
  addDiploma(diploma:Diploma){
    this.createdDiplomas.push(diploma);
  }
  // diploma blueprint creation dialog
  openDialog(){
    const dialogRef = this.dialog.open(DiplomaBlueprintCreateComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      if(data) {this.addDiploma(data);}
    })
  }
}
