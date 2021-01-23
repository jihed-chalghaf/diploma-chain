import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Diploma } from 'app/models/diploma.model';
import { DiplomaService } from 'app/services/diploma.service';
import { Address } from 'soltypes';
import { DiplomaBluePrintService } from 'app/services/diploma-blue-print.service';
import {DiplomaBluePrint} from 'app/models/diplomaBluePrint.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {GoDialogComponent} from 'app/components/go-dialog/go-dialog.component'
@Component({
  selector: 'app-diploma-request',
  templateUrl: './diploma-request.component.html',
  styleUrls: ['./diploma-request.component.css']
})
export class DiplomaRequestComponent implements OnInit {

  requested_diploma: Diploma;
  requestForm: FormGroup;
  diplomaBluePrints:DiplomaBluePrint[]
  constructor(
    public dialog: MatDialog,
    private diplomaService: DiplomaService,
    private diplomaBluePrintService:DiplomaBluePrintService,
    public dialogRef: MatDialogRef<DiplomaRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    // load the diplomas  blueprints
    this.requestForm = new FormGroup({
      blueprintId:new FormControl('',[Validators.required]),
      honors:new FormControl('',[Validators.required])
    })
    this.loadBlueprints()
  }
  async loadBlueprints(){
    this.diplomaBluePrints = await this.diplomaBluePrintService.getDiplomaBlueprints();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  changeBlueprint(event){
    this.requestForm.patchValue({blueprintId:event.target.value})
  }
  
  requestDiploma() {
    // for the issuer since we only have INSAT, we'll select it's address by default in the form
    if(this.requestForm.valid){
      const dialogRef = this.dialog.open(GoDialogComponent, {
        restoreFocus:true,
      });
  
      dialogRef.afterClosed().subscribe( async result => {
        console.log("gocomp result ",result)
        if(result){
          console.log(this.requestForm.value)
          this.diplomaService.requestDiploma(
            this.requestForm.value.blueprintId,
            this.requestForm.value.honors,
          )
          this.dialogRef.close(true);
        }
      })
  
     
    }
  }

}

// this interface doesn't affect anything aside from the data type above
export interface DialogData {
  issuer: Address;
  speciality: string;
  honors: string;
  title: string;
  dateObtained: number;
}