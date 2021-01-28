
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Diploma } from 'app/models/diploma.model';
import { ConversionService } from 'app/services/conversion.service';
import { DiplomaService } from 'app/services/diploma.service';
import { VerificationService } from 'app/services/verification.service';

@Component({
  selector: "app-diploma-verif",
  templateUrl: "./diploma-verif.component.html",
  styleUrls: ["./diploma-verif.component.css"]
})
export class DiplomaVerifComponent implements OnInit {
  @Output() verified = new EventEmitter<boolean>();
  @Output() uploaded = new EventEmitter<void>();
  @Output() checked = new EventEmitter<void>();

  fileOver: boolean = false;
  selectedFile: File = null;
  fileUrl:string = null;

  diploma: Diploma;
  verification_state: number;
  diploma_exist: Boolean;
  // verification_state variable will guide us in showing the proper result to the verifier
  // if the diploma is found => 1, then in the html file we'll display it
  // if the diploma is not found => 2, we will display smth like "Sorry, this diploma does not exist!"

  constructor(
    private verificationService: VerificationService,
    private conversionService:ConversionService
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

  async onVerify(){
    // check if the file is uploaded (drag and drop)
    // or if the user provided a link (must take care of security consideration when handling a untrusted binary data)
    console.log("Executing verifing");
    console.log("Uploaded file ",this.selectedFile);
    console.log("Provided URL", this.fileUrl);
    if(this.selectedFile){

      let fileReader = new FileReader();
      console.log(fileReader)
      fileReader.onloadend = async (e)=> {
        console.log("loeadin", fileReader.result)
        this.uploaded.emit();
        // after loading the content we parse the diploma object and verify

        let loadedDiploma:Diploma = this.conversionService.jsonStringToDiploma(fileReader.result.toString())
        this.checked.emit()
        console.log("loaded diploma ",loadedDiploma)
        let verification  =await this.verifyDiploma(loadedDiploma);
        if(verification){
          this.verified.emit(true)
        }else{
          this.verified.emit(false)
        }
        console.log("verified",verification)
      }
      let fileData = fileReader.readAsText(this.selectedFile)
      //await this.verifyDiploma()
    }
    // if it is uploaded we can check the format and exectue the verification
    // else we need to download the data, check the format and then execute the verification phase 
  }
  async verifyDiploma(diploma: Diploma) {
    this.diploma_exist = await this.verificationService.verifyDiploma(diploma);
    if(this.diploma_exist) {
      this.verification_state = 1;
    }
    else this.verification_state = 2;
    return this.diploma_exist;
  }

}
