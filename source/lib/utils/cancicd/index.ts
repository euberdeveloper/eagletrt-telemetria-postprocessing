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

export function convertMessage(message: Message): string | undefined {
    switch (message.message) {
        case 'inverters.right.speed':
            return getMessage(
                primary.serializePrimaryInverterRightSpeed,
                message,
                primaryIds.topics.TLM.messages.INVERTER_RIGHT_SPEED.id
            );

        case 'inverters.right.temperature_igbt':
            return getMessage(
                primary.serializePrimaryInverterRightTemperatureIgbt,
                message,
                primaryIds.topics.TLM.messages.INVERTER_RIGHT_TEMPERATURE_IGBT.id
            );

        case 'inverters.right.temperature_motors':
            return getMessage(
                primary.serializePrimaryInverterRightTemperatureMotors,
                message,
                primaryIds.topics.TLM.messages.INVERTER_RIGHT_TEMPERATURE_MOTORS.id
            );

        case 'inverters.right.torque':
            return getMessage(
                primary.serializePrimaryInverterRightTorque,
                message,
                primaryIds.topics.TLM.messages.INVERTER_RIGHT_TORQUE.id
            );

        case 'inverters.left.speed':
            return getMessage(
                primary.serializePrimaryInverterLeftSpeed,
                message,
                primaryIds.topics.TLM.messages.INVERTER_LEFT_SPEED.id
            );

        case 'inverters.left.temperature_igbt':
            return getMessage(
                primary.serializePrimaryInverterLeftTemperatureIgbt,
                message,
                primaryIds.topics.TLM.messages.INVERTER_LEFT_TEMPERATURE_IGBT.id
            );

        case 'inverters.left.temperature_motors':
            return getMessage(
                primary.serializePrimaryInverterLeftTemperatureMotors,
                message,
                primaryIds.topics.TLM.messages.INVERTER_LEFT_TEMPERATURE_MOTORS.id
            );

        case 'inverters.left.torque':
            return getMessage(
                primary.serializePrimaryInverterLeftTorque,
                message,
                primaryIds.topics.TLM.messages.INVERTER_LEFT_TORQUE.id
            );

        case 'bms_hv.temperature':
            return getMessage(
                secondary.serializeSecondaryBmsHvTemperature,
                message,
                secondaryIds.topics.TLM.messages.BMS_HV_TEMPERATURE.id
            );
        case 'bms_hv.voltage':
            return getMessage(
                secondary.serializeSecondaryBmsHvVoltage,
                message,
                secondaryIds.topics.TLM.messages.BMS_HV_VOLTAGE.id
            );
        case 'bms_hv.current':
            return getMessage(
                secondary.serializeSecondaryBmsHvCurrent,
                message,
                secondaryIds.topics.TLM.messages.BMS_HV_CURRENT.id
            );

        case 'imu.gyro':
            return getMessage(primary.serializePrimaryImuGyro, message, primaryIds.topics.TLM.messages.IMU_GYRO.id);

        case 'imu.accel':
            return getMessage(primary.serializePrimaryImuAccel, message, primaryIds.topics.TLM.messages.IMU_ACCEL.id);

        case 'pedals.throttle':
            return getMessage(
                primary.serializePrimaryPedalsThrottle,
                message,
                primaryIds.topics.TLM.messages.PEDALS_THROTTLE.id
            );

        case 'pedals.brake':
            return getMessage(
                primary.serializePrimaryPedalsBrake,
                message,
                primaryIds.topics.TLM.messages.PEDALS_BRAKE.id
            );

        case 'steering_wheel.encoder':
            return getMessage(
                primary.serializePrimarySteeringWheelEncoder,
                message,
                primaryIds.topics.TLM.messages.STEERING_WHEEL_ENCODER.id
            );

        case 'front_wheels_encoder.speed_rads':
            return getMessage(
                primary.serializePrimaryFrontWheelsEncodersSpeedRads,
                message,
                primaryIds.topics.TLM.messages.FRONT_WHEELS_ENCODERS_SPEED_RADS.id
            );

        case 'front_wheels_encoder.rotation_and_km':
            return getMessage(
                primary.serializePrimaryFrontWheelsEncodersRotationAndKm,
                message,
                primaryIds.topics.TLM.messages.FRONT_WHEELS_ENCODERS_ROTATION_AND_KM.id
            );
    }
}
