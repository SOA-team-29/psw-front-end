export interface SocialEncounter {
    encounterId: string,
    name: string,
    description: string,
    xpPoints: number,
    status: string,
    type: string,
    latitude: number,
    longitude: number,
    id: any,
    touristsRequiredForCompletion: number,
    distanceTreshold: number,
    touristIDs:  number[] | null,
    shouldBeApproved: boolean
}