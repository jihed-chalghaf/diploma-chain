import { Component, OnInit } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { Diploma } from 'app/models/diploma.model';
import { StudentService } from 'app/services/student.service';
import { Web3Service } from 'app/services/web3.service';
import { DiplomaService } from 'app/services/diploma.service';

import { DiplomaRequestComponent } from "../diploma-request/diploma-request.component";
import { Student } from "app/models/student.model";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  diplomas: Diploma[]=[];
  student:Student
  constructor(
    public dialog: MatDialog,
    private studentService: StudentService,
    private web3Service: Web3Service,
    private diplomaService:DiplomaService
    
  ) { }

  ngOnInit(): void {
    this.getDiplomas();
    this.loadStudent();
  }
  async loadStudent(){
    this.student = await this.studentService.getStudent(this.web3Service.mainAccount);
  }
  async getDiplomas() {
    this.diplomas = await this.studentService.getStudentDiplomas(this.web3Service.mainAccount);
    this.getPendingDiplomas();

  }
  async getPendingDiplomas() {
    let result = await this.diplomaService.getPendingDiplomas();
    this.diplomas = this.diplomas.concat(result.filter(diploma=> diploma.owner.toString()!=this.web3Service.mainAccount.toString()));
  }

  openDialog(){
    const dialogRef = this.dialog.open(DiplomaRequestComponent, {

      restoreFocus:true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getPendingDiplomas();
      }
    })
  }
}
 
