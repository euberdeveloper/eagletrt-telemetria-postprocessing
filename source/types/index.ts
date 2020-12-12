export enum EType {
    CSV, JSON, Test
}

export interface GPSData {
    utc_time: number,
    latitude: number,
    longitude: number,
    altitude: number,
    speed_knots: number,
    course: number
}
