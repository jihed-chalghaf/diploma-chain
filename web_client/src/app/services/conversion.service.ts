import { Injectable } from '@angular/core';
import { Diploma } from 'app/models/diploma.model';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  // diploma: Diploma;
  // json_diploma: any;
  
  constructor() { }

  diplomaToJsonString(diploma: Diploma): string {
   /*  let json_diploma = <JSON><unknown>{
      id: diploma.id,
      blueprintId: diploma.blueprintId,
      owner: diploma.owner,
      issuer: diploma.issuer,
      honors: diploma.honors,
      validated:diploma.validated,
      dateObtained: diploma.dateObtained
    } */
    return JSON.stringify(diploma);
  }

  jsonStringToDiploma(json_diploma: string): Diploma {
    let diploma:Diploma = JSON.parse(json_diploma);
    /* let diploma:Diploma;
    diploma.id = json_diploma.id;
    diploma.blueprintId = json_diploma.blueprintId;
    diploma.owner = json_diploma.owner;
    diploma.issuer = json_diploma.issuer;
    diploma.honors = json_diploma.honors;
    diploma.dateObtained = json_diploma.dateObtained; */
    return diploma;
  }
}
