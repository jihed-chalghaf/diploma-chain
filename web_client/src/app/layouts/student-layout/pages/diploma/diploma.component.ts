import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Bytes32, Address} from 'soltypes';

// services
import { DiplomaService} from 'app/services/diploma.service';
import { DiplomaBluePrintService} from 'app/services/diploma-blue-print.service';
import { ConversionService } from 'app/services/conversion.service';
import { Diploma} from 'app/models/diploma.model';
import { DiplomaBluePrint} from 'app/models/diplomaBluePrint.model';
import { Student } from "app/models/student.model";


// locally used interface to aggregate attributes from the diploma blueprint
interface DiplomaExtended{
  id: Bytes32;
  blueprintId: Bytes32;
  owner: Address;
  issuer: Address;
  title: string ;
  honors: string;
  description: string ;
  speciality: string ;
  validated:boolean;
  dateObtained: number;
}
@Component({
  selector: 'app-diploma',
  templateUrl: './diploma.component.html',
  styleUrls: ['./diploma.component.css']
})
export class DiplomaComponent implements OnInit {
  @Input() diploma:DiplomaExtended;
  @Input() student:Student;
  @ViewChild('diplomaModal',{read:TemplateRef}) diplomaModalRef:TemplateRef<any>;
  downloadJsonHref: SafeUrl;
  fileName: string = "download_diploma.json";
  diploma_to_convert: Diploma = new Diploma();
  constructor(
    public dialog: MatDialog, 
    private sanitizer: DomSanitizer,
    private conversionService: ConversionService,
    private diplomaBlueprintService:DiplomaBluePrintService,
  ) { }

  ngOnInit(): void {
    this.loadDiplomablueprint().then(() => {
      this.generateDownloadJsonUri();      
      console.log(this.diploma_to_convert);
    });
  }
  async loadDiplomablueprint(){
    // load blueprint extra attribute and add them to the local 
    console.log("loading blue print")
    let blueprint:DiplomaBluePrint = await this.diplomaBlueprintService.getSingleDiplomaBlueprint(this.diploma.blueprintId);
    console.log("loaded blueprint ",blueprint);
    this.diploma = {title:blueprint.title,description:blueprint.description,speciality:blueprint.speciality,...this.diploma}
    // using the student name for more significant file name
    this.fileName = `${this.student.firstName}_${this.student.lastName}_${this.diploma.title}.json`;
    console.log("filename = ", this.fileName);
    this.prepareDiplomaForConversion();
  }
    
  popDiploma() {
   // if(this.diploma.verified){
      
      const dialogRef = this.dialog.open(this.diplomaModalRef, {
        
        restoreFocus:true,
        data: {}
      });
      
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
      })
    //}
  }

  prepareDiplomaForConversion() {
    console.log("diploma to be prepared ",this.diploma)
    this.diploma_to_convert.id = this.diploma.id;
    this.diploma_to_convert.blueprintId = this.diploma.blueprintId;
    this.diploma_to_convert.owner = this.diploma.owner;
    this.diploma_to_convert.issuer = this.diploma.issuer;
    this.diploma_to_convert.honors = this.diploma.honors;
    this.diploma_to_convert.validated = this.diploma.validated;
    this.diploma_to_convert.dateObtained = this.diploma.dateObtained;
  }

  generateDownloadJsonUri() {
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(this.conversionService.diplomaToJsonString(this.diploma_to_convert)));
    this.downloadJsonHref = uri;
  }
}
    
  
