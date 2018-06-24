import { Funding } from "./funding.model";
import { Donation } from "./donation.model";

export class Brand {
    id: number;
    name: string;
    fundings: Funding[];
    donations: Donation[];
    dateAdded: Date;
    logoUrl: string;
    logoImage: string;
    description: string;

    constructor() {
        this.id = null;
        this.name = "";
        this.dateAdded = null;
        this.fundings = null;
        this.donations = null;
    }
}
