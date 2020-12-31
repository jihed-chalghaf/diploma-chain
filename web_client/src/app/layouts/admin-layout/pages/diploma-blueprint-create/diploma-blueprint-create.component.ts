import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA  } from "@angular/material/dialog";
@Component({
  selector: 'app-diploma-blueprint-create',
  templateUrl: './diploma-blueprint-create.component.html',
  styleUrls: ['./diploma-blueprint-create.component.css']
})
export class DiplomaBlueprintCreateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DiplomaBlueprintCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BluePrintData) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface BluePrintData{
  name:string;
  description:string;
}