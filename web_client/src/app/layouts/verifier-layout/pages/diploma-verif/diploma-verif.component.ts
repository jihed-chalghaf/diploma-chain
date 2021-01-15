
import { Component, OnInit } from '@angular/core';
import { Diploma } from 'app/models/diploma.model';
import { DiplomaService } from 'app/services/diploma.service';
import { Bytes32 } from 'soltypes';


@Component({
  selector: "app-diploma-verif",
  templateUrl: "./diploma-verif.component.html",
  styleUrls: ["./diploma-verif.component.css"]
})
export class DiplomaVerifComponent implements OnInit {
  fileOver: boolean = false;
  selectedFile: File = null;
  fileUrl:string = null;

  diploma: Diploma;
  verification_state: number;
  // verification_state variable will guide us in showing the proper result to the verifier
  // if the diploma is found => 1, then in the html file we'll display it
  // if the diploma is not found => 2, we will display smth like "Sorry, this diploma does not exist!"

  constructor(
    private diplomaService: DiplomaService
  ) { }

  ngOnInit(): void {
    this.verification_state = 0;

  }
  onFileChange(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.selectedFile = event.target.files[0]
  }
  onDrop(event:DragEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
    console.log("onDrop : ",event.dataTransfer.files);
    this.selectedFile = event.dataTransfer.files[0];
    this.fileOver = false;


  }
  onDragOver(event) {
    this.fileOver = true;
  }
  onDragleave(event) {
    this.fileOver = false;
  }

  onVerify(){
    // check if the file is uploaded (drag and drop)
    // or if the user provided a link (must take care of security consideration when handling a untrusted binary data)
    console.log("Executing verifing");
    console.log("Uploaded file ",this.selectedFile);
    console.log("Provided URL", this.fileUrl);
    
    // if it is uploaded we can check the format and exectue the verification
    // else we need to download the data, check the format and then execute the verification phase 
  }
  verifyDiploma(id: Bytes32) {
    this.diploma = this.diplomaService.verifyDiploma(id);
    if(this.diploma) {
      this.verification_state = 1;
    }
    else this.verification_state = 2;

  }
}
