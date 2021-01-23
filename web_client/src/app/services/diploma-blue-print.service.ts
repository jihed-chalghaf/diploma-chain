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
  constructor(private web3Service: Web3Service) {
    this.Diplomachain = this.web3Service.artifactsToContract();
    console.log("blueprint service ; ",this.Diplomachain)
    
   }

  ngOnInit() {
    /* console.log("oninit diploma blueprint service")
    this.web3Service
      .artifactsToContract(diplomachain_artifacts)
      .then((DiplomachainAbstraction) => {
        console.log("oninit blueprint service",DiplomachainAbstraction)
        this.Diplomachain = DiplomachainAbstraction;
      }); */
      
  }

  async getDiplomaBlueprints() :Promise<DiplomaBluePrint[]>{
    /* this.Diplomachain.getDiplomaBlueprints().call()
    .then(result => console.log("result ",result))
    .catch(error => console.log("result error ",error)); */
    let result:DiplomaBluePrint[] =  await this.Diplomachain.getDiplomaBlueprints().call();

    return result;
  }

  async addDiplomaBlueprint(
    title:string,
    description:string,
    speciality:string
    )  {
    let result:DiplomaBluePrint = await this.Diplomachain.addDiplomaBlueprint(
      title,
      description,
      speciality,
      <Bytes32[]>[]
      ).send();
    return result;
    
    /* this.Diplomachain.then((deployed) => {
      deployed.addDiplomaBlueprint
        .call(diplomaBlueprintId, { from: this.web3Service.mainAccount })
        .then((result) => {
          return result;
        })
        .catch((err) => console.log(err));
    }); */
  }

  async getSingleDiplomaBlueprint(diplomaBlueprintId: Bytes32) {
    let result =  await this.Diplomachain.getDiplomaBlueprint(diplomaBlueprintId).call();
    console.log("getDiplomaBlueprint" ,result);
    return result;
  }

}
