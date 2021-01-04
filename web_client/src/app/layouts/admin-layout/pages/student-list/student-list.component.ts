import { Component, OnInit } from '@angular/core';
import { Student } from 'app/models/student.model';
import { StudentService } from 'app/services/student.service';
declare let require: any;

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: any[];
  full_students: Student[];

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void { 
    this.getStudents();
  }

  getStudents() {
    this.full_students = this.studentService.getStudents();
    this.extractCredentials();
  }

  extractCredentials() {
    for(var student of this.full_students) {
      this.students.push({
        id: student.id,
        fullName: student.firstName + " " + student.lastName
      });
    }
  }

}
