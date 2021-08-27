import { Message } from '../parsers';

import * as primary from './nets/primary';
import * as secondary from './nets/secondary';

import * as primaryIds from './ids/primary.json';
import * as secondaryIds from './ids/secondary.json';

function getMessage(lambda: any, message: Message, id: number): string {
    const payload = lambda(typeof message.value === 'object' ? message.value : { value: message.value });
    const strPayload = payload
        .toString('hex')
        .split(',')
        .map(el => (+el).toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase();

    const timestamp = message.timestamp as number;
    const seconds = Math.floor(timestamp / 1000);
    const micros = (timestamp % 1000) * 1000;
    const strTimestamp = `${seconds.toString()}.${micros.toString().padEnd(6, '0')}`;

    const strId = id.toString(16).toUpperCase();

    return `(${strTimestamp}) can0  ${strId}#${strPayload}`;
}

export function convertMessage(message: Message): [string | undefined, string | undefined] {
    let value: string | undefined;

    switch (message.message) {
        case 'inverters.right.speed':
            value = getMessage(
                primary.serializePrimaryInverterRightSpeed,
                message,
                primaryIds.topics.TLM.messages.INVERTER_RIGHT_SPEED.id
            );
            return [value, undefined];

        case 'inverters.right.temperature_igbt':
            value = getMessage(
                primary.serializePrimaryInverterRightTemperatureIgbt,
                message,
                primaryIds.topics.TLM.messages.INVERTER_RIGHT_TEMPERATURE_IGBT.id
            );
            return [value, undefined];

        case 'inverters.right.temperature_motors':
            value = getMessage(
                primary.serializePrimaryInverterRightTemperatureMotors,
                message,
                primaryIds.topics.TLM.messages.INVERTER_RIGHT_TEMPERATURE_MOTORS.id
            );
            return [value, undefined];

        case 'inverters.right.torque':
            value = getMessage(
                primary.serializePrimaryInverterRightTorque,
                message,
                primaryIds.topics.TLM.messages.INVERTER_RIGHT_TORQUE.id
            );
            return [value, undefined];

        case 'inverters.left.speed':
            value = getMessage(
                primary.serializePrimaryInverterLeftSpeed,
                message,
                primaryIds.topics.TLM.messages.INVERTER_LEFT_SPEED.id
            );
            return [value, undefined];

        case 'inverters.left.temperature_igbt':
            value = getMessage(
                primary.serializePrimaryInverterLeftTemperatureIgbt,
                message,
                primaryIds.topics.TLM.messages.INVERTER_LEFT_TEMPERATURE_IGBT.id
            );
            return [value, undefined];

        case 'inverters.left.temperature_motors':
            value = getMessage(
                primary.serializePrimaryInverterLeftTemperatureMotors,
                message,
                primaryIds.topics.TLM.messages.INVERTER_LEFT_TEMPERATURE_MOTORS.id
            );
            return [value, undefined];

        case 'inverters.left.torque':
            value = getMessage(
                primary.serializePrimaryInverterLeftTorque,
                message,
                primaryIds.topics.TLM.messages.INVERTER_LEFT_TORQUE.id
            );
            return [value, undefined];

        case 'bms_hv.temperature':
            value = getMessage(
                secondary.serializeSecondaryBmsHvTemperature,
                message,
                secondaryIds.topics.TLM.messages.BMS_HV_TEMPERATURE.id
            );
            return [undefined, value];
        case 'bms_hv.voltage':
            value = getMessage(
                secondary.serializeSecondaryBmsHvVoltage,
                message,
                secondaryIds.topics.TLM.messages.BMS_HV_VOLTAGE.id
            );
            return [undefined, value];
        case 'bms_hv.current':
            value = getMessage(
                secondary.serializeSecondaryBmsHvCurrent,
                message,
                secondaryIds.topics.TLM.messages.BMS_HV_CURRENT.id
            );
            return [undefined, value];

        case 'imu.gyro':
            value = getMessage(primary.serializePrimaryImuGyro, message, primaryIds.topics.TLM.messages.IMU_GYRO.id);
            return [value, undefined];

        case 'imu.accel':
            value = getMessage(primary.serializePrimaryImuAccel, message, primaryIds.topics.TLM.messages.IMU_ACCEL.id);
            return [value, undefined];

        case 'pedals.throttle':
            value = getMessage(
                primary.serializePrimaryPedalsThrottle,
                message,
                primaryIds.topics.TLM.messages.PEDALS_THROTTLE.id
            );
            return [value, undefined];

        case 'pedals.brake':
            value = getMessage(
                primary.serializePrimaryPedalsBrake,
                message,
                primaryIds.topics.TLM.messages.PEDALS_BRAKE.id
            );
            return [value, undefined];

        case 'steering_wheel.encoder':
            value = getMessage(
                primary.serializePrimarySteeringWheelEncoder,
                message,
                primaryIds.topics.TLM.messages.STEERING_WHEEL_ENCODER.id
            );
            return [value, undefined];

        case 'front_wheels_encoders.speed_rads':
            value = getMessage(
                primary.serializePrimaryFrontWheelsEncodersSpeedRads,
                message,
                primaryIds.topics.TLM.messages.FRONT_WHEELS_ENCODERS_SPEED_RADS.id
            );
            return [value, undefined];

        case 'front_wheels_encoders.rotation_and_km':
            value = getMessage(
                primary.serializePrimaryFrontWheelsEncodersRotationAndKm,
                message,
                primaryIds.topics.TLM.messages.FRONT_WHEELS_ENCODERS_ROTATION_AND_KM.id
            );
            return [value, undefined];
    }
    return [undefined, undefined];
}
