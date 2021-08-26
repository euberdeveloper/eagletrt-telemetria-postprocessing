import { zweiComplement } from './zweiComplement';

export type CanMessageParser = (msg: number[]) => any;

export const PARSERS: Record<string, CanMessageParser> = {
    /* INVERTERS */
    PARSE_INVERTERS_SPEED: msg => zweiComplement((msg[2] << 8) + msg[1]),
    PARSE_INVERTERS_TEMPERATURE_IGBT: msg => (msg[2] << 8) + msg[1],
    PARSE_INVERTERS_TEMPERATURE_MOTORS: msg => (msg[2] << 8) + msg[1],
    PARSE_INVERTERS_TORQUE: msg => (msg[2] << 8) + msg[1],

    /* BMS_HV */
    PARSE_BMS_HV_VOLTAGE: msg => ({
        total: (msg[1] << 16) + (msg[2] << 8) + msg[3],
        max: (msg[4] << 8) + msg[5],
        min: (msg[6] << 8) + msg[7]
    }),
    PARSE_BMS_HV_TEMPERATURE: msg => ({
        average: (msg[1] << 8) + msg[2],
        max: (msg[3] << 8) + msg[4],
        min: (msg[5] << 8) + msg[6]
    }),
    PARSE_BMS_HV_CURRENT: msg => ({
        current: (msg[1] << 8) + msg[2],
        pow: msg[3] << (8 + msg[4])
    }),
    PARSE_BMS_HV_ERROR_WARNINGS: msg => ({
        fault_id: msg[1],
        fault_index: msg[2]
    }),

    /* BMS_LV*/
    PARSE_BMS_LV_VALUES: msg => ({
        temperature: msg[2] / 5,
        voltage: msg[0] / 10
    }),

    /* IMU */
    PARSE_IMU: msg => ({
        x: (msg[0] << 8) + msg[1],
        y: (msg[2] << 8) + msg[3],
        z: (msg[4] << 8) + msg[5]
    }),

    /* STEERING WHEEL ENCODER */
    PARSE_STEERING_WHEEL_ENCODER: msg => (msg[1] << 8) + msg[2],

    /* PEDALS */
    PARSE_PEDALS_THROTTLE: msg => msg[1],
    PARSE_PEDALS_BRAKE: msg => ({
        is_breaking: msg[1],
        pressure_front: (msg[2] << 8) + msg[4],
        pressure_back: (msg[5] << 8) + msg[7]
    }),

    /* FRONT_WHEELS_ENCODERS */
    PARSE_FRONT_WHEELS_ENCODERS_SPEED_RADS: msg => ({
        left: (msg[0] << 16) + (msg[1] << 8) + msg[2] * (msg[6] == 1 ? 1 : -1),
        right: (msg[3] << 16) + (msg[4] << 8) + msg[5] * (msg[7] == 1 ? 1 : -1)
    }),
    PARSE_FRONT_WHEELS_ENCODERS_ROTATION_AND_KM: msg => ({
        rotations: (msg[0] << 16) + (msg[1] << 8) + msg[2],
        km: (msg[3] << 16) + (msg[4] << 8) + msg[5]
    }),

    /* STEERING_WHEEL_GEARS */
    STEERING_WHEEL_GEARS: msg => ({
        control: msg[1],
        cooling: msg[2],
        map: msg[3]
    })
};
