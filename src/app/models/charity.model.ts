import { Story } from "./story.model";

export class Charity {
    id: number;
    name: string;
    description: string;
    dateAdded: Date;
    stories: Story[];
    logoImage: string;
    logoUrl: string;
}