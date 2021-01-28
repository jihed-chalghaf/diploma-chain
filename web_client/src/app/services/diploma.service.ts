import { Injectable, OnInit } from '@angular/core';
import { Web3Service } from './web3.service';
import { Bytes32 } from 'soltypes';
declare let require: any;
const diplomachain_artifacts = require("../../../../blockchain/build/contracts/Diplomachain.json");
import { Diploma } from 'app/models/diploma.model';

@Injectable({
  providedIn: 'root'
})
export class DiplomaService implements OnInit {

  Diplomachain: any;
  diploma: Diploma;
  diplomas: Diploma[];
  index: number;
  exist: Boolean;

  constructor(private web3Service: Web3Service) { 
    this.Diplomachain = this.web3Service.artifactsToContract();
  }

  ngOnInit() {
    /* console.log("oninit diplomaservice");
    
    this.web3Service
      .artifactsToContract(diplomachain_artifacts)
      .then((DiplomachainAbstraction) => {
        console.log("oninit diplomaservice ",DiplomachainAbstraction);

        this.Diplomachain = DiplomachainAbstraction;
      }); */
  }

  async getDiplomas()/* : Diploma[] */ {
    /* this.Diplomachain.deployed().then((deployed) => {
      deployed.getDiplomas
        .call({ from: this.web3Service.mainAccount })
        .then((result) => {
          this.diplomas = result;
        })
        .catch((err) => console.log(err));
    });
    return this.diplomas; */
    let result = await this.Diplomachain.getDiplomas().call();
    return result;
  }

  async getPendingDiplomas() {
    let result = await this.Diplomachain.getPendingDiplomas().call();
    return result;
  }

  async requestDiploma(blueprintId,honors) {
    let dateTime = new Date();

    let result = await this.Diplomachain.requestDiploma(
          blueprintId,
          honors,
          dateTime.getTime()
        ).send()
    return result;        
  }

  // No need to get the index for diploma (we can get it fully)

  /* getDiplomaIndex(diploma_id: Bytes32): number {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.getDiplomaIndex
        .call(diploma_id, { from: this.web3Service.mainAccount })
        .then((result) => {
          this.index = result;
        })
        .catch((err) => console.log(err));
    });
    return this.index;
  } */
  issueDiploma(diploma: Diploma) {
    let dateTime = new Date();
    this.Diplomachain.issueDiploma(
      diploma.owner,
      diploma.blueprintId,
      diploma.honors,
      dateTime.getTime()
    ).send();
    /* this.Diplomachain.deployed().then((deployed) => {
      deployed.issueDiploma
        .call(
          diploma.owner,
          diploma.issuer,
          diploma.honors,
          diploma.dateObtained,
          { from: this.web3Service.mainAccount }
        )
        .then((result) => {
          return result;
        })
        .catch((err) => console.log(err));
    }); */
  }

  async validateDiploma(diploma_id: Bytes32) {
    /* this.Diplomachain.deployed().then((deployed) => {
      deployed.addDiploma
        .call(diploma_id, { from: this.web3Service.mainAccount })
        .then((result) => {
          return result;
        })
        .catch((err) => console.log(err));
    }); */
    let result = await this.Diplomachain.validateDiploma(diploma_id).send();
    return result;
  }
  
 

  getDiploma(diploma_id: Bytes32): Diploma {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.getDiploma
        .call(diploma_id)
        .then((result) => {
          this.diploma = result;
        })
        .catch((err) => console.log(err));
    });
    return this.diploma;
  }
}
 