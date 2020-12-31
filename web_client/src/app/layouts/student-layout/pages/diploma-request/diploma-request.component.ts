import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-diploma-request',
  templateUrl: './diploma-request.component.html',
  styleUrls: ['./diploma-request.component.css']
})
export class DiplomaRequestComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DiplomaRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
// this interface doesn't affect anything aside from the data type above
export interface DialogData {
  issuer: string;
  diploma: string;
}