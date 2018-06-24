import { Transaction } from "./transaction.model";
import { Donor } from "./donor.model";
import { Brand } from "./brand.model";
import { Story } from "./story.model";

export class Donation {
    id: number;
    donor: Donor;
    donorId: number;
    story: Story;
    amount: number;
    // type: number;
    // pointsCompany: PointsCompany;
    transactions: Transaction[];
    totalBrandAmount: number;
    totalStoryAmount: number;
    totalMicrofunditAmount: number;
    matchedBrands: Brand[];
    dateAdded: Date;
    matchedAmount: number;

    constructor() {
        this.id = null;
        this.donor = null;
        this.donorId = null;
        // this.story = story;
        this.amount = null;
        // this.type = null;
        // this.pointsCompany = null;
        this.transactions = null;
        // this.matchedBrands = null;
        this.dateAdded = null;
        this.matchedAmount = null;
    }
}
