import { timeStampable } from '../../Generics/timeStampable.entity';
export declare class UserEntity extends timeStampable {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    salt: string;
    role: string;
    birthDate: string;
    country: string;
    city: string;
}
