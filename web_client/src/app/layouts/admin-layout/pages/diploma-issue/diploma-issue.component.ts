import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from "app/models/student.model";
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
  constructor(public dialog: MatDialog) { }
  
  ngOnInit(): void {
   /*  this.students = [
      {id:Address.from("0xDC25EF3F5B8A186998338A2ADA83795FBA2D695E"),'firstName':'Mohamed','lastName':'Test','nationality':'TN','phoneNumber':'424242424242','email':'test@email.com','diplomas':[],'gender':'na'},
    ]; */
  }
  addStudent(student:Student){
    this.students.push(student);
  }
  deleteStudent(studentId:Address){

    this.students= this.students.filter(student=> student.id!=studentId);
  }
  // this will open to add another diploma to be issued
  openDialog(){
    const dialogRef = this.dialog.open(this.diplomaHolderModalRef, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log("diploma holder : ",data);
      this.addStudent({id:data.address});
    })
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
