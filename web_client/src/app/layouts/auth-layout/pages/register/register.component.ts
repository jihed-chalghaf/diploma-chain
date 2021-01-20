import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from 'app/models/student.model';
import { StudentService } from 'app/services/student.service';
import { Web3Service } from 'app/services/web3.service';
import { Bytes32 } from 'soltypes';
import { nationalitiesList } from 'app/models/enum/nationalities';
import { gender } from 'app/models/enum/gender';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newStudent: Student;
  diplomas: Bytes32[] = [];
  nationalitiesList = nationalitiesList;
  gendersList = gender;
  errorText = '';
  error = false;
  accepted = false;
  success = false;
  msg: any;

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
  }

  register(form: NgForm) {
    console.log('beginning of the registration process');
    // make sure the new student isn't trying to register while he's logged in
    // we will redirect the user if logged using a guard
      // prepare the new student in the correct format for creation
      this.newStudent = new Student();
      // this.newStudent.id = form.controls.id.value;
      this.newStudent.firstName = form.controls.firstName.value;
      this.newStudent.lastName = form.controls.lastName.value;
      this.newStudent.email = form.controls.email.value;
      this.newStudent.diplomas = this.diplomas;

      // a little log for testing purposes
      console.log(this.newStudent);
      // finally call the service function to initiate the creation
      let result = this.studentService.addStudent(this.newStudent);
      console.log('register result ',result);
  }

  closeSuccess() {
    this.success = false;
  }

}
