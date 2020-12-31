import { Component, OnInit } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { DiplomaRequestComponent } from "../diploma-request/diploma-request.component";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    
  }
  openDialog(){
    const dialogRef = this.dialog.open(DiplomaRequestComponent, {

      restoreFocus:true,
      data: {name: "test", animal: "oupa"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    })
  }
}
