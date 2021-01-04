import { Injectable, OnInit } from '@angular/core';
import { Web3Service } from './web3.service';
import { Address, Bytes32 } from 'soltypes';
declare let require: any;
const diplomachain_artifacts = require("../../../../blockchain/build/contracts/Diplomachain.json");
import { Student } from 'app/models/student.model';
import { Diploma } from 'app/models/diploma.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService implements OnInit {

  Diplomachain: any;
  student: Student;
  students: Student[];
  diplomas: Diploma[];
  diplomas_ids: Bytes32[];
  index: number;

  constructor(private web3Service: Web3Service) { }

  ngOnInit() {
    this.web3Service
      .artifactsToContract(diplomachain_artifacts)
      .then((DiplomachainAbstraction) => {
        this.Diplomachain = DiplomachainAbstraction;
      });
  }

  getStudents(): Student[] {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.getStudents
        .call({ from: this.web3Service.mainAccount })
        .then((result) => {
          this.students = result;
        })
        .catch((err) => console.log(err));
    });
    return this.students;
  }

  getStudent(student: Address): Student {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.getStudent
        .call(student, { from: this.web3Service.mainAccount })
        .then((result) => {
          this.student = result;
        })
        .catch((err) => console.log(err));
    });
    return this.student;
  }

  getStudentDiplomas(student: Address): Diploma[] {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.getStudentDiplomas
      .call(student, { from: this.web3Service.mainAccount })
      .then((result) => {
        this.diplomas = result;
      })
      .catch((err) => console.log(err));
    });
    return this.diplomas;
  }

  getStudentDiplomasIds(student: Address): Bytes32[] {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.getStudentDiplomasIds
      .call(student, { from: this.web3Service.mainAccount })
      .then((result) => {
        this.diplomas_ids = result;
      })
      .catch((err) => console.log(err));
    });
    return this.diplomas_ids;
  }

  getStudentIndex(student: Address): number {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.getStudentIndex
      .call(student, { from: this.web3Service.mainAccount })
      .then((result) => {
        this.index = result;
      })
      .catch((err) => console.log(err));
    });
    return this.index;
  }
  
  addStudent(student: Student) {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.addStudent
      .call(
        student.id,
        student.firstName,
        student.lastName,
        student.email,
        student.nationality,
        student.phoneNumber,
        student.gender,
        student.diplomas,
        { from: this.web3Service.mainAccount }
      ) 
      .then((result) => {
        return result;
      })
      .catch((err) => console.log(err));
    });
  }

  deleteStudent(student_addr: Address) {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.deleteStudent
      .call(
        student_addr,
        { from: this.web3Service.mainAccount }
      ) 
      .then((result) => {
        return result;
      })
      .catch((err) => console.log(err));
    });
  }

}
