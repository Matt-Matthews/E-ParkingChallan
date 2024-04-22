export interface violation{
    id: string;
    regNum: string;
    description: string;
    location: string;
    violationType: string;
    status: string;
    officerId: string;
    ownerId: string;
    imageUrls: Array<string>;
    createdAt: Date
}