import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from "app/models/student.model";
import { StudentService } from 'app/services/student.service';
import { Bytes32, Address} from 'soltypes';
// this only used for injection data within the dialog (can be changed to match the contract field types)

@Component({
  selector: 'app-diploma-issue',
  templateUrl: './diploma-issue.component.html',
  styleUrls: ['./diploma-issue.component.css']
})
export class DiplomaIssueComponent implements OnInit {
  @ViewChild('diplomaHolderModal',{read:TemplateRef}) diplomaHolderModalRef:TemplateRef<any> ;
  students: Student[]=[];
  newStudent: Student;

  // check points used to indicate in which phase the issuing 

  checkPoints = [
    {name:"Creating",description:"uploading the diploma file",completed:true,isEnd:false},
    {name:"Hashing",description:"Hashing the diploma content",completed:false,isEnd:false},
    {name:"Issuing",description:"Interacting with the blockchain",completed:false,isEnd:false},
    {name:"Done",description:"Done",completed:true,isEnd:true}
  ]
  constructor(
    public dialog: MatDialog,
    private studentService: StudentService
  ) { }
  
  ngOnInit(): void {
   /*  this.students = [
      {id:Address.from("0xDC25EF3F5B8A186998338A2ADA83795FBA2D695E"),'firstName':'Mohamed','lastName':'Test','nationality':'TN','phoneNumber':'424242424242','email':'test@email.com','diplomas':[],'gender':'na'},
    ]; */
  }
  addStudent(student:Student){
    //this.students.push(student);
    this.studentService.addStudent(student);
  }
  
  deleteStudent(studentId:Address){
    //this.students= this.students.filter(student=> student.id!=studentId);
    this.studentService.deleteStudent(studentId);
  }
  // this will open to add another diploma to be issued
  openDialog(){
    const dialogRef = this.dialog.open(this.diplomaHolderModalRef, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log("diploma holder : ", data);
      // verify if the admin provided all the necessay attributes, for now just id..
      if(data && data.id) {
        // Here also, we need to add all the attributes
        this.newStudent.id = data.id;
        this.newStudent.firstName = data.firstName;
        this.newStudent.lastName = data.lastName;
        this.newStudent.email = data.email;
        this.newStudent.gender = data.gender;
        this.newStudent.nationality = data.nationality;
        this.addStudent(this.newStudent);
      }
    });
  }
}

/* @Component({
  selector: 'app-diploma-holder-add',
  templateUrl: './diploma-holder-add.html',
})
export class DiplomaHolderDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DiplomaHolderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DiplomaHolderData) {}

  ngOnInit(): void{
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

} */
