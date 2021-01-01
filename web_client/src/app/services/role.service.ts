import { Injectable, OnInit } from '@angular/core';
import { LocalService } from './local.service';
import { Web3Service } from './web3.service';
declare let require: any;
const diplomachain_artifacts = require("../../../../blockchain/build/contracts/Diplomachain.json");

@Injectable({
  providedIn: 'root'
})
export class RoleService implements OnInit {

  Diplomachain: any;

  constructor(
    private web3Service: Web3Service,
    private localService: LocalService
  ) { }

  ngOnInit() {
    this.web3Service
      .artifactsToContract(diplomachain_artifacts)
      .then((DiplomachainAbstraction) => {
        this.Diplomachain = DiplomachainAbstraction;
      });
  }

  getRole(): String {
    this.Diplomachain.deployed().then((deployed) => {
      deployed.isAdmin
        .call({ from: this.web3Service.mainAccount })
        .then((result) => {
          if(result) {
            return "Admin";
          }
        })
        .catch((err) => console.log(err));
      deployed.isStudent
        .call({ from: this.web3Service.mainAccount })
        .then((result) => {
          if(result) {
            return "Student";
          }
        })
        .catch((err) => console.log(err));
      deployed.isIssuer
        .call({ from: this.web3Service.mainAccount })
        .then((result) => {
          if(result) {
            return "Issuer";
          }
        })
        .catch((err) => console.log(err));
    });
    return "Verifier";
  }
  // store the role in our browser's local storage using the secure local storage service
  setRole() {
    this.localService.setJsonValue('role', this.getRole());
  }
}
