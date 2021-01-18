import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ConversionService } from 'app/services/conversion.service';

// temporary diploma structure (as it include different attributes)
// here we also need to display all the relevant attributes in a diploma
// otherwise we're only using the "title" attribute of each diploma in our html file
interface Diploma{
  title?: string;
  verified?: boolean;
}

@Component({
  selector: 'app-diploma',
  templateUrl: './diploma.component.html',
  styleUrls: ['./diploma.component.css']
})
export class DiplomaComponent implements OnInit {
  @Input() diploma:Diploma;
  @ViewChild('diplomaModal',{read:TemplateRef}) diplomaModalRef:TemplateRef<any>;
  downloadJsonHref: SafeUrl;
  fileName: string = "download_diploma.json";

  constructor(
    public dialog: MatDialog, 
    private sanitizer: DomSanitizer,
    private conversionService: ConversionService
  ) { }

  ngOnInit(): void {
    this.generateDownloadJsonUri();
    // commenting this to avoid compilation problems, when we force the input diploma to be of type Diploma, we'll be good to go
    //this.fileName = this.diploma.id + ".json";
  }

  popDiploma() {
    if(this.diploma.verified){
      
      const dialogRef = this.dialog.open(this.diplomaModalRef, {
        
        restoreFocus:true,
        data: {name: "test", animal: "oupa"}
      });
      
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
      })
    }
  }

  generateDownloadJsonUri() {
    /*var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(this.conversionService.diplomaToJsonString(this.diploma)));
    this.downloadJsonHref = uri;*/
  }
}
