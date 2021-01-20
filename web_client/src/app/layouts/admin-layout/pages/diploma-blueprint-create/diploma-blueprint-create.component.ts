import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA  } from "@angular/material/dialog";
import {DiplomaBluePrint} from 'app/models/diplomaBluePrint.model';
@Component({
  selector: 'app-diploma-blueprint-create',
  templateUrl: './diploma-blueprint-create.component.html',
  styleUrls: ['./diploma-blueprint-create.component.css']
})
export class DiplomaBlueprintCreateComponent implements OnInit {
  diplomaBlueprintForm : FormGroup;
  constructor(public dialogRef: MatDialogRef<DiplomaBlueprintCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DiplomaBluePrint) { }

  ngOnInit(): void {
    this.diplomaBlueprintForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      speciality: new FormControl(),
    });
  }
  close(): void {
    this.dialogRef.close(null);
  }
  createDiplomaBlueprint(){
    this.dialogRef.close(this.diplomaBlueprintForm.value);
  }
}
