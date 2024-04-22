export interface Violation{
    id: string;
    regNum: string;
    description: string;
    location: string;
    violationType: string;
    amount: number;
    status: string;
    officerId: string;
    ownerId: string;
    imageUrls: Array<string>;
    createdAt: Date
}