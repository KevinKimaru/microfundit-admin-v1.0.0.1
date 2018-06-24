import { Donation } from "./donation.model";
import { Charity } from "./charity.model";

export class Story {
    id: number;
    description: string;
    charity: Charity;
    targetAmount: number;
    currentAmount: number;
    timeAllocated: number;
    dateAdded: Date;
    status: number;
    images: string[];
    donations: Donation[];
    logoUrl: string;
    logoImage: string;

    donorsNumber: number;
    donatedAmount: number;

    currentBrandMatches: number;
    currentBrandTotalAmount: number;
    currentBrandDonors: number;

    currentFundingMatches: number;
    currentFundingTotalAmount: number;
    currentFundingDonors: number;

    constructor() {
        this.id = null;
        this.description = "";
        this.charity = null;
        this.targetAmount = null;
        this.currentAmount = null;
        this.timeAllocated = null;
        this.dateAdded = null;
        this.status = null;
        this.images = null;
        this.donations = null;
    }
}