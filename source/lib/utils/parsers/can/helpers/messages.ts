import { zweiComplement } from './zweiComplement';

// Define types

type CanMessageParser = (msg: number[]) => any;
type CanMessage = {
    message: string;
    id: number;
    fb?: number;
    parser: CanMessageParser;
};

// Define messages parsers

/* INVERTERS */
const PARSE_INVERTERS_SPEED: CanMessageParser = msg => zweiComplement((msg[2] << 8) + msg[1]);
const PARSE_INVERTERS_TEMPERATURE_IGBT: CanMessageParser = msg => ((msg[2] << 8) + msg[1] - 15797) / 112.1182;
const PARSE_INVERTERS_TEMPERATURE_MOTORS: CanMessageParser = msg => ((msg[2] << 8) + msg[1] - 9393.9) / 55.1;
const PARSE_INVERTERS_TORQUE: CanMessageParser = msg => ((msg[2] << 8) + msg[1] - 9393.9) / 55.1;

/* BMS_HV */
const PARSE_BMS_HV_VOLTAGE: CanMessageParser = msg => ({
    total: ((msg[1] << 16) + (msg[2] << 8) + msg[3]) / 10000,
    max: ((msg[4] << 8) + msg[5]) / 10000,
    min: ((msg[6] << 8) + msg[7]) / 10000
});
const PARSE_BMS_HV_TEMPERATURE: CanMessageParser = msg => ({
    average: ((msg[1] << 8) + msg[2]) / 100,
    max: ((msg[3] << 8) + msg[4]) / 100,
    min: ((msg[5] << 8) + msg[6]) / 100
});
const PARSE_BMS_HV_CURRENT: CanMessageParser = msg => ({
    current: ((msg[1] << 8) + msg[2]) / 10,
    pow: ((msg[3] << 8) + msg[4]) / 10
});
const PARSE_BMS_HV_ERROR_WARNINGS: CanMessageParser = msg => ({
    fault_id: msg[1],
    fault_index: Math.abs(msg[2] / 10)
});

/* BMS_LV*/
const PARSE_BMS_LV_VALUES: CanMessageParser = msg => ({
    temperature: msg[2] / 5,
    voltage: msg[0] / 10
});

/* IMU OLD */
const PARSE_IMU_OLD_ACCEL: CanMessageParser = msg => {
    const scale = msg[7];
    return {
        x: ((msg[1] << 8 + msg[2]) / 100) - scale,
        y: ((msg[3] << 8 + msg[4]) / 100) - scale,
        z: ((msg[5] << 8 + msg[6]) / 100) - scale,
        scale: scale
    };
};
const PARSE_IMU_OLD_GYRO: CanMessageParser = msg => {
    const scale = msg[7];
    return {
        x: ((msg[1] << 8 + msg[2]) / 10) - scale,
        y: ((msg[3] << 8 + msg[4]) / 10) - scale,
        z: ((msg[5] << 8 + msg[6]) / 10) - scale,
        scale: scale
    };
};

/* IMU */
const PARSE_IMU: CanMessageParser = msg => ({
    x: zweiComplement((msg[0] << 8) + msg[1]) / 100,
    y: zweiComplement((msg[2] << 8) + msg[3]) / 100,
    z: zweiComplement((msg[4] << 8) + msg[5]) / 100
});

/* STEERING WHEEL ENCODER */
const PARSE_STEERING_WHEEL_ENCODER: CanMessageParser = msg => ((msg[1] << 8) + msg[2]) / 100;

/* PEDALS */
const PARSE_PEDALS_THROTTLE: CanMessageParser = msg => msg[1];
const PARSE_PEDALS_BRAKE: CanMessageParser = msg => ({
    is_breaking: msg[1],
    pressure_front: ((msg[2] << 8) + msg[4]) / 500,
    pressure_back: ((msg[5] << 8) + msg[7]) / 500
});

/* FRONT_WHEELS_ENCODERS */
const PARSE_FRONT_WHEELS_ENCODERS_SPEED: CanMessageParser = msg => ({
    speed: ((msg[1] << 8) + msg[2]) * (msg[3] === 0 ? 1 : -1),
    error_flag: msg[6]
});
const PARSE_FRONT_WHEELS_ENCODERS_SPEED_RADS: CanMessageParser =
    msg => ((msg[1] << 16) + (msg[2] << 8) + msg[3]) / (msg[7] === 1 ? -10000 : 10000);
const PARSE_FRONT_WHEELS_ENCODERS_ANGLE: CanMessageParser = msg => ({
    angle_0: ((msg[1] << 8) + msg[2]) / 100,
    angle_1: ((msg[3] << 8) + msg[4]) / 100,
    angle_delta: ((msg[5] << 8) + msg[6]) / 100
});
const PARSE_DISTANCE: CanMessageParser = msg => ({
    meters: (msg[1] << 8) + msg[2],
    rotations: (msg[3] << 8) + msg[4],
    angle: msg[5] & 0x0F,
    clock_period: msg[6] & 0x0F
});

/* STEERING_WHEEL_GEARS */
const STEERING_WHEEL_GEARS: CanMessageParser = msg => ({
    control: msg[1],
    cooling: msg[2],
    map: msg[3]
});

// Export structure
export default [
    /* INVERTERS RIGHT */
    {
        message: 'inverters.right.speed',
        id: 0x181,
        fb: 0xA8,
        parser: PARSE_INVERTERS_SPEED
    },
    {
        message: 'inverters.right.temperature_igbt',
        id: 0x181,
        fb: 0x4A,
        parser: PARSE_INVERTERS_TEMPERATURE_IGBT
    },
    {
        message: 'inverters.right.temperature_motors',
        id: 0x181,
        fb: 0x49,
        parser: PARSE_INVERTERS_TEMPERATURE_MOTORS
    },
    {
        message: 'inverters.right.torque',
        id: 0x181,
        fb: 0xA0,
        parser: PARSE_INVERTERS_TORQUE
    },
    /* INVERTERS LEFT */
    {
        message: 'inverters.left.speed',
        id: 0x182,
        fb: 0xA8,
        parser: PARSE_INVERTERS_SPEED
    },
    {
        message: 'inverters.left.temperature_igbt',
        id: 0x182,
        fb: 0x4A,
        parser: PARSE_INVERTERS_TEMPERATURE_IGBT
    },
    {
        message: 'inverters.left.temperature_motors',
        id: 0x182,
        fb: 0x49,
        parser: PARSE_INVERTERS_TEMPERATURE_MOTORS
    },
    {
        message: 'inverters.left.torque',
        id: 0x182,
        fb: 0xA0,
        parser: PARSE_INVERTERS_TORQUE
    },
    /* BMS_HV */
    {
        message: 'bms_hv.voltage',
        id: 0xAA,
        fb: 0x01,
        parser: PARSE_BMS_HV_VOLTAGE
    },
    {
        message: 'bms_hv.temperature',
        id: 0xAA,
        fb: 0x0A,
        parser: PARSE_BMS_HV_TEMPERATURE
    },
    {
        message: 'bms_hv.current',
        id: 0xAA,
        fb: 0x05,
        parser: PARSE_BMS_HV_CURRENT
    },
    {
        message: 'bms_hv.errors',
        id: 0xAA,
        fb: 0x08,
        parser: PARSE_BMS_HV_ERROR_WARNINGS
    },
    {
        message: 'bms_hv.warnings',
        id: 0xAA,
        fb: 0x09,
        parser: PARSE_BMS_HV_ERROR_WARNINGS
    },
    /* BMS_LV*/
    {
        message: 'bms_lv.values',
        id: 0xFF,
        parser: PARSE_BMS_LV_VALUES
    },
    /* IMU_OLD */
    {
        message: 'imu_old.accel',
        id: 0xC0,
        fb: 0x00,
        parser: PARSE_IMU_OLD_ACCEL
    },
    {
        message: 'imu_old.gyro',
        id: 0xC0,
        fb: 0x01,
        parser: PARSE_IMU_OLD_GYRO
    },
    /* IMU */
    {
        message: 'imu.accel',
        id: 0x4ED,
        parser: PARSE_IMU
    },
    {
        message: 'imu.gyro',
        id: 0x4EC,
        parser: PARSE_IMU
    },
    /* STEERING WHEEL ENCODER */
    {
        message: 'steering_wheel.encoder',
        id: 0xC0,
        fb: 0x02,
        parser: PARSE_STEERING_WHEEL_ENCODER
    },
    /* PEDALS */
    {
        message: 'pedals.throttle',
        id: 0xB0,
        fb: 0x01,
        parser: PARSE_PEDALS_THROTTLE
    },
    {
        message: 'pedals.brake',
        id: 0xB0,
        fb: 0x02,
        parser: PARSE_PEDALS_BRAKE
    },
    /* FRONT_WHEELS_ENCODERS_RIGHT */
    {
        message: 'front_wheels_encoders.right.speed',
        id: 0xD0,
        fb: 0x06,
        parser: PARSE_FRONT_WHEELS_ENCODERS_SPEED
    },
    {
        message: 'front_wheels_encoders.right.speed_rads',
        id: 0xD0,
        fb: 0x07,
        parser: PARSE_FRONT_WHEELS_ENCODERS_SPEED_RADS
    },
    {
        message: 'front_wheels_encoders.right.angle',
        id: 0xD0,
        fb: 0x15,
        parser: PARSE_FRONT_WHEELS_ENCODERS_ANGLE
    },
    {
        message: 'distance',
        id: 0xD0,
        fb: 0x08,
        parser: PARSE_DISTANCE
    },
    /* FRONT_WHEELS_ENCODERS_LEFT */
    {
        message: 'front_wheels_encoders.left.speed',
        id: 0xD1,
        fb: 0x06,
        parser: PARSE_FRONT_WHEELS_ENCODERS_SPEED
    },
    {
        message: 'front_wheels_encoders.left.speed_rads',
        id: 0xD1,
        fb: 0x07,
        parser: PARSE_FRONT_WHEELS_ENCODERS_SPEED_RADS
    },
    {
        message: 'front_wheels_encoders.left.angle',
        id: 0xD1,
        fb: 0x15,
        parser: PARSE_FRONT_WHEELS_ENCODERS_ANGLE
    },
    /* STEERING_WHEEL_GEARS */
    {
        message: 'steering_wheel.gears',
        id: 0xA0,
        fb: 0x01,
        parser: STEERING_WHEEL_GEARS
    }
] as CanMessage[];