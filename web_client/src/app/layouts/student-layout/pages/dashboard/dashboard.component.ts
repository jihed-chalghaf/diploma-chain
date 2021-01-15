import { Component, OnInit } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { Diploma } from 'app/models/diploma.model';
import { StudentService } from 'app/services/student.service';
import { Web3Service } from 'app/services/web3.service';
import { DiplomaRequestComponent } from "../diploma-request/diploma-request.component";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  diplomas: Diploma[];

  constructor(
    public dialog: MatDialog,
    private studentService: StudentService,
    private web3Service: Web3Service
  ) { }

  ngOnInit(): void {
    this.getDiplomas();
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

  getDiplomas() {
    this.diplomas = this.studentService.getStudentDiplomas(this.web3Service.mainAccount);
  }
}
