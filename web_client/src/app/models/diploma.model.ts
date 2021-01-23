import { Bytes32, Address} from 'soltypes';
export class Diploma{
    id?: Bytes32;
    blueprintId: Bytes32;
    owner: Address;
    issuer: Address;
    honors: string;
    validated : boolean;
    dateObtained: number;
}