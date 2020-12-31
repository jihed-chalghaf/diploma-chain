import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';


// this only used for injection data within the dialog (can be changed to match the contract field types)
export class DiplomaHolderData{
  address:string;
  diploma:string;
 }

@Component({
  selector: 'app-diploma-issue',
  templateUrl: './diploma-issue.component.html',
  styleUrls: ['./diploma-issue.component.css']
})
export class DiplomaIssueComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  // this will open to add another diploma to be issued
  openDialog(){
    const dialogRef = this.dialog.open(DiplomaHolderDialog, {
      data: {address:"oupa",diploma:"test"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    })
  }
}
@Component({
  selector: 'app-diploma-holder-add',
  templateUrl: './diploma-holder-add.html',
})
export class DiplomaHolderDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DiplomaHolderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DiplomaHolderData) {}

  ngOnInit(): void{
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
