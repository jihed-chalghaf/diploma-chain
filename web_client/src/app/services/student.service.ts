import { Injectable, OnInit } from '@angular/core';
import { Web3Service } from './web3.service';
import { Address } from 'soltypes';
declare let require: any;
const diplomachain_artifacts = require("../../../../blockchain/build/contracts/Diplomachain.json");
import { Student } from 'app/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService implements OnInit {

  Diplomachain: any;

  constructor(private web3Service: Web3Service) { }

  ngOnInit() {
    this.web3Service
      .artifactsToContract(diplomachain_artifacts)
      .then((DiplomachainAbstraction) => {
        this.Diplomachain = DiplomachainAbstraction;
      });
  }

  getStudents() {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.getStudents
        .call({ from: this.web3Service.mainAccount })
        .then((result) => {
          return result;
        })
        .catch((err) => console.log(err));
    });
  }

  getStudentDiplomas(student: Address) {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.getStudentDiplomas
      .call(student, { from: this.web3Service.mainAccount })
      .then((result) => {
        return result;
      })
      .catch((err) => console.log(err));
    });
  }

  getStudentDiplomasIds(student: Address) {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.getStudentDiplomasIds
      .call(student, { from: this.web3Service.mainAccount })
      .then((result) => {
        return result;
      })
      .catch((err) => console.log(err));
    });
  }

  getStudentIndex(student: Address) {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.getStudentIndex
      .call(student, { from: this.web3Service.mainAccount })
      .then((result) => {
        return result;
      })
      .catch((err) => console.log(err));
    });
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
}
