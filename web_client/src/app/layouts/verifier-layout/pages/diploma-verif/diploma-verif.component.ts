import { Component, OnInit } from '@angular/core';
import { Diploma } from 'app/models/diploma.model';
import { DiplomaService } from 'app/services/diploma.service';
import { Bytes32 } from 'soltypes';

@Component({
  selector: 'app-diploma-verif',
  templateUrl: './diploma-verif.component.html',
  styleUrls: ['./diploma-verif.component.css']
})
export class DiplomaVerifComponent implements OnInit {

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

  verifyDiploma(id: Bytes32) {
    this.diploma = this.diplomaService.verifyDiploma(id);
    if(this.diploma) {
      this.verification_state = 1;
    }
    else this.verification_state = 2;
  }
}
