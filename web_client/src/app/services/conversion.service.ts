import { Injectable } from '@angular/core';
import { Diploma } from 'app/models/diploma.model';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  diploma: Diploma;
  json_diploma: any;
  
  constructor() { }

  diplomaToJsonString(diploma: Diploma): string {
    this.json_diploma = <JSON><unknown>{
      id: diploma.id,
      blueprintId: diploma.blueprintId,
      owner: diploma.owner,
      issuer: diploma.issuer,
      honors: diploma.honors,
      dateObtained: diploma.dateObtained
    }
    return JSON.stringify(this.json_diploma);
  }

  jsonStringToDiploma(json_diploma: string): Diploma {
    this.json_diploma = JSON.parse(json_diploma);
    this.diploma.id = this.json_diploma.id;
    this.diploma.blueprintId = this.json_diploma.blueprintId;
    this.diploma.owner = this.json_diploma.owner;
    this.diploma.issuer = this.json_diploma.issuer;
    this.diploma.honors = this.json_diploma.honors;
    this.diploma.dateObtained = this.json_diploma.dateObtained;
    return this.diploma;
  }
}
