export interface Encounter {
    id: any,
    name: string,
    description: string,
    xpPoints: number,
    status: string,
    type: string,
    latitude: number,
    longitude: number,
    shouldBeApproved: boolean
}