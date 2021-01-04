import { Bytes32, Uint256, Address} from 'soltypes';
export class Diploma{
    id?: Bytes32;
    owner: Address;
    issuer: Address;
    speciality: string;
    honors: string;
    title: string;
    dateObtained: number;
}