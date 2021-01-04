import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// temporary diploma structure (as it include different attributes)
interface Diploma{
  title?: string;
  description?: string;
  university?: string;
  signature?: string;
  logo?: string;
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
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  popDiploma(){
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
}
