import { Injectable } from '@angular/core';
import { Diploma } from 'app/models/diploma.model';

const contractInterface = require("../../../../blockchain/build/contracts/Diplomachain.json");


declare let require: any;
const Web3 = require("web3");
const contract = require("@truffle/contract");
@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor() { }

  public artifactsToContractNoAccount(artifacts=contractInterface) {
  
    /*  const contractAbstraction = contract(artifacts);
     console.log("contractabs ",contractAbstraction);
     contractAbstraction.setProvider(this.web3.currentProvider);
     return contractAbstraction; */
     let web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:7545")
    );
    console.log("artifacttocontractnoaccount", web3);
     let contract = new web3.eth.Contract(artifacts.abi,"0xa6c482342Ed853311584EcfA024782885fc1EA15");
    // contract.setProvider(this.web3.currentProvider);
     console.log("web3 no account contract",contract)
     return contract.methods;
   }
   async verifyDiploma(diploma: Diploma): Promise<Boolean> {
     let diplomachain = this.artifactsToContractNoAccount();
    let res = await diplomachain.verifyDiploma(diploma).call();
    return res;
    /* this.Diplomachain.deployed().then((deployed) => {
      deployed.verifyDiploma
        .call(diploma)
        .then((result) => {
          this.exist = result;
        })
        .catch((err) => console.log(err));
    });
    return this.exist; */
  }
}
