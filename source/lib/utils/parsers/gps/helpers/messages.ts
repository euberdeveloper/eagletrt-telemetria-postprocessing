// Define types

import { parseCoordinates } from './parseCoordinates';

type GpsMessageParser = (msg: string[]) => any;
type GpsMessage = {
    message: string;
    type: string;
    parser: GpsMessageParser;
};

// Define messages parsers

/* BMS_HV */
const PARSE_GGA: GpsMessageParser = msg => (+msg[5] ? {
    utc_time: msg[0],
    latitude: parseCoordinates(msg[1]),
    longitude: parseCoordinates(msg[3]),
    ns_indicator: msg[2],
    ew_indicator: msg[4],
    altitude: msg[10]
} : null);
const PARSE_GLL: GpsMessageParser = msg => (msg[5] === 'A' ? {
    utc_time: msg[4],
    latitude: parseCoordinates(msg[0]),
    longitude: parseCoordinates(msg[2]),
    ns_indicator: msg[1],
    ew_indicator: msg[3]
} : null);
const PARSE_VTG: GpsMessageParser = msg => ({
    ground_speed_knots: msg[4],
    ground_speed_human: msg[6]
});
const PARSE_RMC: GpsMessageParser = msg => (msg[1] === 'A' ? {
    utc_time: msg[0],
    latitude: parseCoordinates(msg[2]),
    longitude: parseCoordinates(msg[4]),
    ns_indicator: msg[3],
    ew_indicator: msg[5],
    ground_speed_knots: msg[6],
    date: msg[8]
} : null);


// Export structure

export default [
    {
        message: 'gps.gga',
        type: 'GGA',
        parser: PARSE_GGA
    },
    {
        message: 'gps.gll',
        type: 'GLL',
        parser: PARSE_GLL
    },
    {
        message: 'gps.vtg',
        type: 'VTG',
        parser: PARSE_VTG
    },
    {
        message: 'gps.rmc',
        type: 'RMC',
        parser: PARSE_RMC
    }
] as GpsMessage[];