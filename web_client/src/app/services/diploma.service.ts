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

  constructor(private web3Service: Web3Service) { }

  ngOnInit() {
    this.web3Service
      .artifactsToContract(diplomachain_artifacts)
      .then((DiplomachainAbstraction) => {
        this.Diplomachain = DiplomachainAbstraction;
      });
  }

  getDiplomas() {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.getDiplomas
        .call({ from: this.web3Service.mainAccount })
        .then((result) => {
          return result;
        })
        .catch((err) => console.log(err));
    });
  }

  requestDiploma(diploma: Diploma) {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.requestDiploma
        .call(
          diploma.issuer,
          diploma.speciality,
          diploma.honors,
          diploma.title,
          diploma.dateObtained,
          { from: this.web3Service.mainAccount }
        )
        .then((result) => {
          return result;
        })
        .catch((err) => console.log(err));
    });
  }

  getDiplomaIndex(diploma_id: Bytes32) {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.getDiplomaIndex
        .call(diploma_id, { from: this.web3Service.mainAccount })
        .then((result) => {
          return result;
        })
        .catch((err) => console.log(err));
    });
  }

  issueDiploma(diploma: Diploma) {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.issueDiploma
        .call(
          diploma.owner,
          diploma.issuer,
          diploma.speciality,
          diploma.honors,
          diploma.title,
          diploma.dateObtained,
          { from: this.web3Service.mainAccount }
        )
        .then((result) => {
          return result;
        })
        .catch((err) => console.log(err));
    });
  }

  addDiploma(diploma_id: Bytes32) {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.addDiploma
        .call(diploma_id, { from: this.web3Service.mainAccount })
        .then((result) => {
          return result;
        })
        .catch((err) => console.log(err));
    });
  }
  
  verifyDiploma(diploma_id: Bytes32) {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.verifyDiploma
        .call(diploma_id)
        .then((result) => {
          return result;
        })
        .catch((err) => console.log(err));
    });
  }
}
 