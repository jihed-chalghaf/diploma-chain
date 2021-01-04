import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA  } from "@angular/material/dialog";
@Component({
  selector: 'app-diploma-blueprint-create',
  templateUrl: './diploma-blueprint-create.component.html',
  styleUrls: ['./diploma-blueprint-create.component.css']
})
export class DiplomaBlueprintCreateComponent implements OnInit {
  diplomaBlueprintForm : FormGroup;
  constructor(public dialogRef: MatDialogRef<DiplomaBlueprintCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BluePrintData) { }

  ngOnInit(): void {
    this.diplomaBlueprintForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      university: new FormControl(),
      signature: new FormControl(),
      logo: new FormControl(),
    })
  }
  close(): void {
    this.dialogRef.close(null);
  }
  createDiplomaBlueprint(){
    this.dialogRef.close(this.diplomaBlueprintForm.value);
  }
}

export interface BluePrintData{
  name:string;
  description:string;
}