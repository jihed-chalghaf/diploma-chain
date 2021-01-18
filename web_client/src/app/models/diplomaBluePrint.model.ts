import { Bytes32, Address} from 'soltypes';
export class DiplomaBluePrint{
    id: Bytes32 ;
    issuer: Address ;
    title: string ;
    description: string ;
    speciality: string ;
    diplomas: Bytes32[] ;
}