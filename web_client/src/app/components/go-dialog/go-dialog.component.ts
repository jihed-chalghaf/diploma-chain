import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-go-dialog',
  templateUrl: './go-dialog.component.html',
  styleUrls: ['./go-dialog.component.css']
})
export class GoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
