import { Component, OnInit } from '@angular/core';
import { Student } from 'app/models/student.model';
import { StudentService } from 'app/services/student.service';
import { Web3Service } from 'app/services/web3.service';
declare let require: any;
const diplomachain_artifacts = require("../../../../../../../blockchain/build/contracts/Diplomachain.json");

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  Diplomachain: any;
  students: any[];

  constructor(
    private web3Service: Web3Service,
    private studentService: StudentService
    ) { }

  ngOnInit(): void { 

    this.students = [
      {
        id:"0xrandomnumberbla",
        firstName:"Random name"
      },
      {
        id:"0xrandomnumberbla",
        firstName:"Random name"
      },
      {
        id:"0xrandomnumberbla",
        firstName:"Random name"
      },
      
    ];
  }

}
