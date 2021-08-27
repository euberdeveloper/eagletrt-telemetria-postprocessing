/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as byteify from 'byteify';

export function serializePrimaryTimestamp(data: ReturnType<typeof deserializePrimaryTimestamp>) {
    return Uint8Array.from([...byteify.serializeUint32(data.timestamp).reverse()]);
}
export function deserializePrimaryTimestamp(bytes) {
    return {
        timestamp: byteify.deserializeUint32(bytes.slice(0, 4).reverse())
    };
}

export function serializePrimaryTlmStatus(data: ReturnType<typeof deserializePrimaryTlmStatus>) {
    return Uint8Array.from([...byteify.serializeInt8(data.tlm_status).reverse()]);
}
export function deserializePrimaryTlmStatus(bytes) {
    return {
        tlm_status: byteify.deserializeInt8(bytes.slice(0, 1).reverse())
    };
}

export function serializePrimarySetTlmStatus(data: ReturnType<typeof deserializePrimarySetTlmStatus>) {
    return Uint8Array.from([
        ...byteify.serializeInt8(data.tlm_status).reverse(),
        ...byteify.serializeUint8(data.race).reverse(),
        ...byteify.serializeUint8(data.pilot).reverse(),
        ...byteify.serializeUint8(data.circuit).reverse()
    ]);
}
export function deserializePrimarySetTlmStatus(bytes) {
    return {
        tlm_status: byteify.deserializeInt8(bytes.slice(0, 1).reverse()),
        race: byteify.deserializeUint8(bytes.slice(1, 2).reverse()),
        pilot: byteify.deserializeUint8(bytes.slice(2, 3).reverse()),
        circuit: byteify.deserializeUint8(bytes.slice(3, 4).reverse())
    };
}

export function serializePrimaryInverterRightSpeed(data: ReturnType<typeof deserializePrimaryInverterRightSpeed>) {
    return Uint8Array.from([...byteify.serializeUint16(data.value).reverse()]);
}
export function deserializePrimaryInverterRightSpeed(bytes) {
    return {
        value: byteify.deserializeUint16(bytes.slice(0, 2).reverse())
    };
}

export function serializePrimaryInverterRightTemperatureIgbt(
    data: ReturnType<typeof deserializePrimaryInverterRightTemperatureIgbt>
) {
    return Uint8Array.from([...byteify.serializeUint16(data.value).reverse()]);
}
export function deserializePrimaryInverterRightTemperatureIgbt(bytes) {
    return {
        value: byteify.deserializeUint16(bytes.slice(0, 2).reverse())
    };
}

export function serializePrimaryInverterRightTemperatureMotors(
    data: ReturnType<typeof deserializePrimaryInverterRightTemperatureMotors>
) {
    return Uint8Array.from([...byteify.serializeUint16(data.value).reverse()]);
}
export function deserializePrimaryInverterRightTemperatureMotors(bytes) {
    return {
        value: byteify.deserializeUint16(bytes.slice(0, 2).reverse())
    };
}

export function serializePrimaryInverterRightTorque(data: ReturnType<typeof deserializePrimaryInverterRightTorque>) {
    return Uint8Array.from([...byteify.serializeUint16(data.value).reverse()]);
}
export function deserializePrimaryInverterRightTorque(bytes) {
    return {
        value: byteify.deserializeUint16(bytes.slice(0, 2).reverse())
    };
}

export function serializePrimaryInverterLeftSpeed(data: ReturnType<typeof deserializePrimaryInverterLeftSpeed>) {
    return Uint8Array.from([...byteify.serializeUint16(data.value).reverse()]);
}
export function deserializePrimaryInverterLeftSpeed(bytes) {
    return {
        value: byteify.deserializeUint16(bytes.slice(0, 2).reverse())
    };
}

export function serializePrimaryInverterLeftTemperatureIgbt(
    data: ReturnType<typeof deserializePrimaryInverterLeftTemperatureIgbt>
) {
    return Uint8Array.from([...byteify.serializeUint16(data.value).reverse()]);
}
export function deserializePrimaryInverterLeftTemperatureIgbt(bytes) {
    return {
        value: byteify.deserializeUint16(bytes.slice(0, 2).reverse())
    };
}

export function serializePrimaryInverterLeftTemperatureMotors(
    data: ReturnType<typeof deserializePrimaryInverterLeftTemperatureMotors>
) {
    return Uint8Array.from([...byteify.serializeUint16(data.value).reverse()]);
}
export function deserializePrimaryInverterLeftTemperatureMotors(bytes) {
    return {
        value: byteify.deserializeUint16(bytes.slice(0, 2).reverse())
    };
}

export function serializePrimaryInverterLeftTorque(data: ReturnType<typeof deserializePrimaryInverterLeftTorque>) {
    return Uint8Array.from([...byteify.serializeUint16(data.value).reverse()]);
}
export function deserializePrimaryInverterLeftTorque(bytes) {
    return {
        value: byteify.deserializeUint16(bytes.slice(0, 2).reverse())
    };
}

export function serializePrimaryBmsLvValue(data: ReturnType<typeof deserializePrimaryBmsLvValue>) {
    return Uint8Array.from([
        ...byteify.serializeUint8(data.temperature).reverse(),
        ...byteify.serializeUint8(data.voltage).reverse()
    ]);
}
export function deserializePrimaryBmsLvValue(bytes) {
    return {
        temperature: byteify.deserializeUint8(bytes.slice(0, 1).reverse()),
        voltage: byteify.deserializeUint8(bytes.slice(1, 2).reverse())
    };
}

export function serializePrimaryImuGyro(data: ReturnType<typeof deserializePrimaryImuGyro>) {
    return Uint8Array.from([
        ...byteify.serializeUint16(data.x).reverse(),
        ...byteify.serializeUint16(data.y).reverse(),
        ...byteify.serializeUint16(data.z).reverse()
    ]);
}
export function deserializePrimaryImuGyro(bytes) {
    return {
        x: byteify.deserializeUint16(bytes.slice(0, 2).reverse()),
        y: byteify.deserializeUint16(bytes.slice(2, 4).reverse()),
        z: byteify.deserializeUint16(bytes.slice(4, 6).reverse())
    };
}

export function serializePrimaryImuAccel(data: ReturnType<typeof deserializePrimaryImuAccel>) {
    return Uint8Array.from([
        ...byteify.serializeUint16(data.x).reverse(),
        ...byteify.serializeUint16(data.y).reverse(),
        ...byteify.serializeUint16(data.z).reverse()
    ]);
}
export function deserializePrimaryImuAccel(bytes) {
    return {
        x: byteify.deserializeUint16(bytes.slice(0, 2).reverse()),
        y: byteify.deserializeUint16(bytes.slice(2, 4).reverse()),
        z: byteify.deserializeUint16(bytes.slice(4, 6).reverse())
    };
}

export function serializePrimaryFrontWheelsEncodersSpeedRads(
    data: ReturnType<typeof deserializePrimaryFrontWheelsEncodersSpeedRads>
) {
    return Uint8Array.from([
        ...byteify.serializeInt32(data.left).reverse(),
        ...byteify.serializeInt32(data.right).reverse()
    ]);
}
export function deserializePrimaryFrontWheelsEncodersSpeedRads(bytes) {
    return {
        left: byteify.deserializeInt32(bytes.slice(0, 4).reverse()),
        right: byteify.deserializeInt32(bytes.slice(4, 8).reverse())
    };
}

export function serializePrimaryFrontWheelsEncodersRotationAndKm(
    data: ReturnType<typeof deserializePrimaryFrontWheelsEncodersRotationAndKm>
) {
    return Uint8Array.from([
        ...byteify.serializeUint32(data.rotations).reverse(),
        ...byteify.serializeUint32(data.km).reverse()
    ]);
}
export function deserializePrimaryFrontWheelsEncodersRotationAndKm(bytes) {
    return {
        rotations: byteify.deserializeUint32(bytes.slice(0, 4).reverse()),
        km: byteify.deserializeUint32(bytes.slice(4, 8).reverse())
    };
}

export function serializePrimaryPedalsThrottle(data: ReturnType<typeof deserializePrimaryPedalsThrottle>) {
    return Uint8Array.from([...byteify.serializeUint8(data.value).reverse()]);
}
export function deserializePrimaryPedalsThrottle(bytes) {
    return {
        value: byteify.deserializeUint8(bytes.slice(0, 1).reverse())
    };
}

export function serializePrimaryPedalsBrake(data: ReturnType<typeof deserializePrimaryPedalsBrake>) {
    return Uint8Array.from([
        ...byteify.serializeUint8(data.is_breaking ? 1 : 0).reverse(),
        1,
        ...byteify.serializeUint16(data.pressure_front).reverse(),
        ...byteify.serializeUint16(data.pressure_back).reverse()
    ]);
}
export function deserializePrimaryPedalsBrake(bytes) {
    return {
        is_breaking: byteify.deserializeUint8(bytes.slice(0, 1).reverse()),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __unused_padding_1: byteify.deserializeUint8(bytes.slice(1, 2).reverse()),
        pressure_front: byteify.deserializeUint16(bytes.slice(2, 4).reverse()),
        pressure_back: byteify.deserializeUint16(bytes.slice(4, 6).reverse())
    };
}

export function serializePrimarySteeringWheelEncoder(data: ReturnType<typeof deserializePrimarySteeringWheelEncoder>) {
    return Uint8Array.from([...byteify.serializeUint16(data.value).reverse()]);
}
export function deserializePrimarySteeringWheelEncoder(bytes) {
    return {
        value: byteify.deserializeUint16(bytes.slice(0, 2).reverse())
    };
}

export function serializePrimarySteeringWheelManettini(
    data: ReturnType<typeof deserializePrimarySteeringWheelManettini>
) {
    return Uint8Array.from([
        ...byteify.serializeUint8(data.control).reverse(),
        ...byteify.serializeUint8(data.cooling).reverse(),
        ...byteify.serializeUint8(data.map).reverse()
    ]);
}
export function deserializePrimarySteeringWheelManettini(bytes) {
    return {
        control: byteify.deserializeUint8(bytes.slice(0, 1).reverse()),
        cooling: byteify.deserializeUint8(bytes.slice(1, 2).reverse()),
        map: byteify.deserializeUint8(bytes.slice(2, 3).reverse())
    };
}
