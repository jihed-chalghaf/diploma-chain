import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address} from 'soltypes';

// modals
import { Student } from "app/models/student.model";
import { Diploma } from "app/models/diploma.model";
import { DiplomaBluePrint } from "app/models/diplomaBluePrint.model";

// services
import { DiplomaBluePrintService } from 'app/services/diploma-blue-print.service';
import { StudentService } from 'app/services/student.service';
import { DiplomaService } from 'app/services/diploma.service';

// this only used for injection data within the dialog (can be changed to match the contract field types)

@Component({
  selector: 'app-diploma-issue',
  templateUrl: './diploma-issue.component.html',
  styleUrls: ['./diploma-issue.component.css']
})
export class DiplomaIssueComponent implements OnInit {
  @ViewChild('diplomaHolderModal',{read:TemplateRef}) diplomaHolderModalRef:TemplateRef<any> ;
  students: Student[]
  diplomaBlueprints:DiplomaBluePrint[];
  diplomas:Diploma[]=[];

  // check points used to indicate in which phase the issuing 

  checkPoints = [
    {name:"Creating",description:"uploading the diploma file",completed:false,isEnd:false},
    {name:"Issuing",description:"Interacting with the blockchain",completed:false,isEnd:false},
    {name:"Done",description:"Done",completed:false,isEnd:true}
  ]
  constructor(
    public dialog: MatDialog,
    private studentService: StudentService,
    private blueprintService: DiplomaBluePrintService,
    private diplomaService: DiplomaService,
  ) { }
  
  ngOnInit(): void {
 
    // loading the data that will be used within the model form
    this.loadStudents();
    this.loadBlueprints();
  }

  async loadStudents(){
    this.students = await this.studentService.getStudents();
    console.log("diplomaissue ",this.students)
  }
  async loadBlueprints(){
    this.diplomaBlueprints = await this.blueprintService.getDiplomaBlueprints();
    console.log("diplomablueprint ",this.diplomaBlueprints)
  }
  addDiploma(diploma:Diploma){
    console.log("adding diploma ",diploma)
    this.diplomas.push(diploma);
  }
  deleteDiploma(index){
    console.log("delete",index)
    this.diplomas = this.diplomas.filter((_,diplomaIndex)=> diplomaIndex !=index);
    // deleting the student from the list and not from the blockchain storage 
    // also the student object will be created when auth this is why we don't need it deletion anymore

    //this.students= this.students.filter(student=> student.id!=studentId);
    /* this.studentService.deleteStudent(studentId); */
  }
  // this will open to add another diploma to be issued
  openDialog(){
    const dialogRef = this.dialog.open(this.diplomaHolderModalRef, {
      data: {
        owner:'',
        blueprintId:'',
        honors:'',
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log("diploma holder : ", data);
      // verify if the admin provided all the necessay attributes, for now just id..
      if(data) {
        // Here also, we need to add all the attributes

        this.addDiploma(data);
      }
    });
  }

  issueDiplomas(){
    // iterate through the draft diploma
    this.checkPoints[0].completed = true;
    this.diplomas.forEach(diploma=> {
      this.diplomaService.issueDiploma(diploma);
    })
    // execute transaction for all the diploma creations

  }
}
