import { Donation } from "./donation.model";

export class Donor {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
    gender: number;
    dateAdded: Date;
    donations: Donation[];
    username: string;
    password: string;
    role: string;

    storiesNumber: number;
    charitiesNumber: number;
}