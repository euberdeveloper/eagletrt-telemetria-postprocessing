import { parseCoordinates } from './parseCoordinates';

export type GpsMessageParser = (msg: string[]) => any;

export const PARSERS: Record<string, GpsMessageParser> = {
    PARSE_GGA: msg =>
        +msg[5]
            ? {
                  utc_time: msg[0],
                  latitude: parseCoordinates(msg[1]),
                  longitude: parseCoordinates(msg[3]),
                  ns_indicator: msg[2],
                  ew_indicator: msg[4],
                  altitude: msg[10]
              }
            : null,
    PARSE_GLL: msg =>
        msg[5] === 'A'
            ? {
                  utc_time: msg[4],
                  latitude: parseCoordinates(msg[0]),
                  longitude: parseCoordinates(msg[2]),
                  ns_indicator: msg[1],
                  ew_indicator: msg[3]
              }
            : null,
    PARSE_VTG: msg => ({
        ground_speed_knots: msg[4],
        ground_speed_human: msg[6]
    }),
    PARSE_RMC: msg =>
        msg[1] === 'A'
            ? {
                  utc_time: msg[0],
                  latitude: parseCoordinates(msg[2]),
                  longitude: parseCoordinates(msg[4]),
                  ns_indicator: msg[3],
                  ew_indicator: msg[5],
                  ground_speed_knots: msg[6],
                  date: msg[8]
              }
            : null
};
