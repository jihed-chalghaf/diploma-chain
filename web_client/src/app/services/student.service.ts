import { Injectable, OnInit } from '@angular/core';
import { Web3Service } from './web3.service';
import { Router } from '@angular/router';
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

  constructor(
    private web3Service: Web3Service,
    private router: Router
  ) {
    this.Diplomachain = this.web3Service.artifactsToContract();
   }

  ngOnInit() {
    /* this.web3Service
      .artifactsToContract(diplomachain_artifacts)
      .then((DiplomachainAbstraction) => {
        this.Diplomachain = DiplomachainAbstraction;
      }); */
  }

  async getStudents()/* : Student[] */ {
    /* this.Diplomachain.deployed().then((deployed) => {
      deployed.getStudents
        .call({ from: this.web3Service.mainAccount })
        .then((result) => {
          this.students = result;
        })
        .catch((err) => console.log(err));
    });
    return this.students; */
    let result = await this.Diplomachain.getStudents().call();
    return result;
  }

  async getStudent(studentAddress: Address): Promise<Student> {
    let result = await this.Diplomachain.getStudent(studentAddress).call();
    return result;
    /* this.Diplomachain.deployed().then((deployed) => {
      deployed.getStudent
        .call(student, { from: this.web3Service.mainAccount })
        .then((result) => {
          this.student = result;
        })
        .catch((err) => console.log(err));
    });
    return this.student; */
  }
  async getStudentPendingDiplomas(student: Address){
    let result = await this.Diplomachain.getStudentPendingDiplomas(student).call();
    return result;
  }
  async getStudentDiplomas(student: Address)/* : Diploma[] */ {

    let result = await this.Diplomachain.getStudentDiplomas(student).call();
    return result;
    /* this.Diplomachain.deployed().then((deployed) => {
      deployed.getStudentDiplomas
      .call(student, { from: this.web3Service.mainAccount })
      .then((result) => {
        this.diplomas = result;
      })
      .catch((err) => console.log(err));
    });
    return this.diplomas; */
  }

  // No need to get Diplomas Id when we could get their full objects

  /* getStudentDiplomasIds(student: Address): Bytes32[] {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.getStudentDiplomasIds
      .call(student, { from: this.web3Service.mainAccount })
      .then((result) => {
        this.diplomas_ids = result;
      })
      .catch((err) => console.log(err));
    });
    return this.diplomas_ids;
  } */
  // No need to get the index when we can get the full object (better for performance)

  /* getStudentIndex(student: Address): number {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.getStudentIndex
      .call(student, { from: this.web3Service.mainAccount })
      .then((result) => {
        this.index = result;
      })
      .catch((err) => console.log(err));
    });
    return this.index;
  } */
  
  async addStudent(student: Student) {
    console.log("addstudent service : ",student)
  /*   this.Diplomachain.deployed().then((deployed) => {
      deployed.addStudent
      .call(
        //student.id,
        student.firstName,
        student.lastName,
        student.email,
        student.diplomas
      ) 
      .then((result) => {
        this.router.navigate(['/']);
        console.log("adding student ",result)
        return result;
      })
      .catch((err) => console.log(err));
    }); */
    let result = await this.Diplomachain.addStudent(
      student.firstName,
        student.lastName,
        student.email,
        student.diplomas
    ).send();
    return result;
  }
  // deleting is not adequate 
  /* deleteStudent(student_addr: Address) {
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
  } */

}
