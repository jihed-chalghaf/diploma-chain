import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Diploma } from 'app/models/diploma.model';
import { DiplomaService } from 'app/services/diploma.service';
import { Address } from 'soltypes';

@Component({
  selector: 'app-diploma-request',
  templateUrl: './diploma-request.component.html',
  styleUrls: ['./diploma-request.component.css']
})
export class DiplomaRequestComponent implements OnInit {

  requested_diploma: Diploma;
  
  constructor(
    private diplomaService: DiplomaService,
    public dialogRef: MatDialogRef<DiplomaRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  requestDiploma() {
    // for the issuer since we only have INSAT, we'll select it's address by default in the form
    this.requested_diploma.issuer = this.data.issuer;
    this.requested_diploma.speciality = this.data.speciality;
    this.requested_diploma.honors = this.data.honors;
    this.requested_diploma.title = this.data.title;
    this.requested_diploma.dateObtained = Date.now();
    this.diplomaService.requestDiploma(this.requested_diploma);
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