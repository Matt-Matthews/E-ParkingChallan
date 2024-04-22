export interface violation{
    id: string;
    regNum: string;
    description: string;
    locationId: string;
    violationType: string;
    status: string;
    officerId: string;
    ownerId: string;
    imageUrls: Array<string>;
    createdAt: Date
}