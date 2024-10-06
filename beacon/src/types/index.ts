export interface SOSReport {
    recordID?: string;
    emergencyPhone: string;
    location: string;
    latitude: number | null;
    longitude: number | null;
    fullName: string;
}
