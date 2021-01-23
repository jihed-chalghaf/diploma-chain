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


// locally used interface to aggregate atttributs from the diploma blueprint
interface DiplomaExtended{
  id: Bytes32;
  blueprintId: Bytes32;
  owner: Address;
  issuer: Address;
  title: string ;
  honors: string;
  description: string ;
  speciality: string ;
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
  constructor(
    public dialog: MatDialog, 
    private sanitizer: DomSanitizer,
    private conversionService: ConversionService,
    private diplomaBlueprintService:DiplomaBluePrintService,
  ) { }

  ngOnInit(): void {
    this.generateDownloadJsonUri();
    // commenting this to avoid compilation problems, when we force the input diploma to be of type Diploma, we'll be good to go
    //this.fileName = this.diploma.id + ".json";
    this.loadDiplomablueprint();
  }
  async loadDiplomablueprint(){
    // load blueprint extra attribute and add them to the local 
    console.log("loading blue print")
    let blueprint:DiplomaBluePrint = await this.diplomaBlueprintService.getSingleDiplomaBlueprint(this.diploma.blueprintId);
    console.log("loaded blueprint ",blueprint);
    
    
    this.diploma = {title:blueprint.title,description:blueprint.description,speciality:blueprint.speciality,...this.diploma}
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

  generateDownloadJsonUri() {
    /*var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(this.conversionService.diplomaToJsonString(this.diploma)));
    this.downloadJsonHref = uri;*/
  }
}
