import { Bytes32, Address} from 'soltypes';
export class Student{
    id: Address;
    firstName?: string;
    lastName?: string;
    email?: string;
    diplomas?: Bytes32[];
}