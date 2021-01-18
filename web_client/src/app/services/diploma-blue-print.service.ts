import { Injectable, OnInit } from '@angular/core';
import { Web3Service } from './web3.service';
import { Bytes32 } from 'soltypes';
declare let require: any;
const diplomachain_artifacts = require("../../../../blockchain/build/contracts/Diplomachain.json");
import { DiplomaBluePrint } from 'app/models/diplomaBluePrint.model';
@Injectable({
  providedIn: 'root'
})
export class DiplomaBluePrintService implements OnInit{
  Diplomachain: any;
  diplomaBlueprint: DiplomaBluePrint;
  diplomaBlueprints: DiplomaBluePrint[];
  index: number;
  constructor(private web3Service: Web3Service) { }

  ngOnInit() {
    this.web3Service
      .artifactsToContract(diplomachain_artifacts)
      .then((DiplomachainAbstraction) => {
        this.Diplomachain = DiplomachainAbstraction;
      });
  }

  getDiplomaBlueprints(): DiplomaBluePrint[] {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.getDiplomaBlueprints
        .call({ from: this.web3Service.mainAccount })
        .then((result) => {
          this.diplomaBlueprints = result;
        })
        .catch((err) => console.log(err));
    });
    return this.diplomaBlueprints;
  }

  addDiplomaBlueprint(diplomaBlueprintId: Bytes32) {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.addDiplomaBlueprint
        .call(diplomaBlueprintId, { from: this.web3Service.mainAccount })
        .then((result) => {
          return result;
        })
        .catch((err) => console.log(err));
    });
  }

  getDiplomaBlueprint(diplomaBlueprintId: Bytes32): DiplomaBluePrint {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.getDiplomaBlueprint
        .call(diplomaBlueprintId)
        .then((result) => {
          this.diplomaBlueprint = result;
        })
        .catch((err) => console.log(err));
    });
    return this.diplomaBlueprint;
  }

}
