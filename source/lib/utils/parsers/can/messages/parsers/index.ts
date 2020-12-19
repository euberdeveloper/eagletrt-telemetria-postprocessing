import { zweiComplement } from './zweiComplement';

export type CanMessageParser = (msg: number[]) => any;

export const PARSERS: Record<string, CanMessageParser> = {
    /* INVERTERS */
    PARSE_INVERTERS_SPEED: msg => zweiComplement((msg[2] << 8) + msg[1]),
    PARSE_INVERTERS_TEMPERATURE_IGBT: msg => ((msg[2] << 8) + msg[1] - 15797) / 112.1182,
    PARSE_INVERTERS_TEMPERATURE_MOTORS: msg => ((msg[2] << 8) + msg[1] - 9393.9) / 55.1,
    PARSE_INVERTERS_TORQUE: msg => ((msg[2] << 8) + msg[1] - 9393.9) / 55.1,

    /* BMS_HV */
    PARSE_BMS_HV_VOLTAGE: msg => ({
        total: ((msg[1] << 16) + (msg[2] << 8) + msg[3]) / 10000,
        max: ((msg[4] << 8) + msg[5]) / 10000,
        min: ((msg[6] << 8) + msg[7]) / 10000
    }),
    PARSE_BMS_HV_TEMPERATURE: msg => ({
        average: ((msg[1] << 8) + msg[2]) / 100,
        max: ((msg[3] << 8) + msg[4]) / 100,
        min: ((msg[5] << 8) + msg[6]) / 100
    }),
    PARSE_BMS_HV_CURRENT: msg => ({
        current: ((msg[1] << 8) + msg[2]) / 10,
        pow: ((msg[3] << 8) + msg[4]) / 10
    }),
    PARSE_BMS_HV_ERROR_WARNINGS: msg => ({
        fault_id: msg[1],
        fault_index: Math.abs(msg[2] / 10)
    }),

    /* BMS_LV*/
    PARSE_BMS_LV_VALUES: msg => ({
        temperature: msg[2] / 5,
        voltage: msg[0] / 10
    }),

    /* IMU OLD */
    PARSE_IMU_OLD_ACCEL: msg => {
        const scale = msg[7];
        return {
            x: (msg[1] << (8 + msg[2])) / 100 - scale,
            y: (msg[3] << (8 + msg[4])) / 100 - scale,
            z: (msg[5] << (8 + msg[6])) / 100 - scale,
            scale: scale
        };
    },
    PARSE_IMU_OLD_GYRO: msg => {
        const scale = msg[7];
        return {
            x: (msg[1] << (8 + msg[2])) / 10 - scale,
            y: (msg[3] << (8 + msg[4])) / 10 - scale,
            z: (msg[5] << (8 + msg[6])) / 10 - scale,
            scale: scale
        };
    },

    /* IMU */
    PARSE_IMU: msg => ({
        x: zweiComplement((msg[0] << 8) + msg[1]) / 100,
        y: zweiComplement((msg[2] << 8) + msg[3]) / 100,
        z: zweiComplement((msg[4] << 8) + msg[5]) / 100
    }),

    /* STEERING WHEEL ENCODER */
    PARSE_STEERING_WHEEL_ENCODER: msg => ((msg[1] << 8) + msg[2]) / 100,

    /* PEDALS */
    PARSE_PEDALS_THROTTLE: msg => msg[1],
    PARSE_PEDALS_BRAKE: msg => ({
        is_breaking: msg[1],
        pressure_front: ((msg[2] << 8) + msg[4]) / 500,
        pressure_back: ((msg[5] << 8) + msg[7]) / 500
    }),

    /* FRONT_WHEELS_ENCODERS */
    PARSE_FRONT_WHEELS_ENCODERS_SPEED: msg => ({
        speed: ((msg[1] << 8) + msg[2]) * (msg[3] === 0 ? 1 : -1),
        error_flag: msg[6]
    }),
    PARSE_FRONT_WHEELS_ENCODERS_SPEED_RADS: msg =>
        ((msg[1] << 16) + (msg[2] << 8) + msg[3]) / (msg[7] === 1 ? -10000 : 10000),
    PARSE_FRONT_WHEELS_ENCODERS_ANGLE: msg => ({
        angle_0: ((msg[1] << 8) + msg[2]) / 100,
        angle_1: ((msg[3] << 8) + msg[4]) / 100,
        angle_delta: ((msg[5] << 8) + msg[6]) / 100
    }),
    PARSE_DISTANCE: msg => ({
        meters: (msg[1] << 8) + msg[2],
        rotations: (msg[3] << 8) + msg[4],
        angle: msg[5] & 0x0f,
        clock_period: msg[6] & 0x0f
    }),

    /* STEERING_WHEEL_GEARS */
    STEERING_WHEEL_GEARS: msg => ({
        control: msg[1],
        cooling: msg[2],
        map: msg[3]
    })
};