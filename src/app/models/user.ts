export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    passwordSalt: string;
    passwordHash: string;
    status: boolean;
}