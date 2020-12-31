import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DiplomaBlueprintCreateComponent} from '../diploma-blueprint-create/diploma-blueprint-create.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  // diploma blueprint creation dialog
  openDialog(){
    const dialogRef = this.dialog.open(DiplomaBlueprintCreateComponent, {

      restoreFocus:true,
      data: {name: "test", animal: "oupa"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    })
  }
}
