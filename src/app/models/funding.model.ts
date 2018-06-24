import { Brand } from "./brand.model";

export class Funding {
    id: number;
    brand: Brand;
    placedAmount: number;
    currentAmount: number;
    dateAdded: Date;
    status: number;
    ratio: number;

    donationsNumber: number;
    donorsNumber: number;
    highestDonation: number;
    storiesNumber: number;
    charitiesNumber: number;

    constructor() {
        this.id = null;
        this.brand = null;
        this.placedAmount = null;
        this.currentAmount = null;
        this.dateAdded = null;
        this.status = null;
        this.ratio = null;
    }
}
