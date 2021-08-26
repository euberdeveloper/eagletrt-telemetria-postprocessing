/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as byteify from 'byteify';

export function serializePrimaryTimestamp(data: ReturnType<typeof deserializePrimaryTimestamp>) {
    return Uint8Array.from([...byteify.serializeUint32(data.timestamp)]);
}
export function deserializePrimaryTimestamp(bytes) {
    return {
        timestamp: byteify.deserializeUint32(bytes.slice(0, 4))
    };
}

export function serializePrimaryTlmStatus(data: ReturnType<typeof deserializePrimaryTlmStatus>) {
    return Uint8Array.from([...byteify.serializeInt8(data.tlm_status)]);
}
export function deserializePrimaryTlmStatus(bytes) {
    return {
        tlm_status: byteify.deserializeInt8(bytes.slice(0, 1))
    };
}

export function serializePrimarySetTlmStatus(data: ReturnType<typeof deserializePrimarySetTlmStatus>) {
    return Uint8Array.from([
        ...byteify.serializeInt8(data.tlm_status),
        ...byteify.serializeUint8(data.race),
        ...byteify.serializeUint8(data.pilot),
        ...byteify.serializeUint8(data.circuit)
    ]);
}
export function deserializePrimarySetTlmStatus(bytes) {
    return {
        tlm_status: byteify.deserializeInt8(bytes.slice(0, 1)),
        race: byteify.deserializeUint8(bytes.slice(1, 2)),
        pilot: byteify.deserializeUint8(bytes.slice(2, 3)),
        circuit: byteify.deserializeUint8(bytes.slice(3, 4))
    };
}

export function serializePrimaryInverterRightSpeed(data: ReturnType<typeof deserializePrimaryInverterRightSpeed>) {
    return Uint8Array.from([...byteify.serializeFloat32(data.value)]);
}
export function deserializePrimaryInverterRightSpeed(bytes) {
    return {
        value: byteify.deserializeInt16(bytes.slice(0, 2))
    };
}

export function serializePrimaryInverterRightTemperatureIgbt(
    data: ReturnType<typeof deserializePrimaryInverterRightTemperatureIgbt>
) {
    return Uint8Array.from([...byteify.serializeFloat32(data.value)]);
}
export function deserializePrimaryInverterRightTemperatureIgbt(bytes) {
    return {
        value: byteify.deserializeInt16(bytes.slice(0, 2))
    };
}

export function serializePrimaryInverterRightTemperatureMotors(
    data: ReturnType<typeof deserializePrimaryInverterRightTemperatureMotors>
) {
    return Uint8Array.from([...byteify.serializeFloat32(data.value)]);
}
export function deserializePrimaryInverterRightTemperatureMotors(bytes) {
    return {
        value: byteify.deserializeInt16(bytes.slice(0, 2))
    };
}

export function serializePrimaryInverterRightTorque(data: ReturnType<typeof deserializePrimaryInverterRightTorque>) {
    return Uint8Array.from([...byteify.serializeFloat32(data.value)]);
}
export function deserializePrimaryInverterRightTorque(bytes) {
    return {
        value: byteify.deserializeInt16(bytes.slice(0, 2))
    };
}

export function serializePrimaryInverterLeftSpeed(data: ReturnType<typeof deserializePrimaryInverterLeftSpeed>) {
    return Uint8Array.from([...byteify.serializeFloat32(data.value)]);
}
export function deserializePrimaryInverterLeftSpeed(bytes) {
    return {
        value: byteify.deserializeInt16(bytes.slice(0, 2))
    };
}

export function serializePrimaryInverterLeftTemperatureIgbt(
    data: ReturnType<typeof deserializePrimaryInverterLeftTemperatureIgbt>
) {
    return Uint8Array.from([...byteify.serializeFloat32(data.value)]);
}
export function deserializePrimaryInverterLeftTemperatureIgbt(bytes) {
    return {
        value: byteify.deserializeInt16(bytes.slice(0, 2))
    };
}

export function serializePrimaryInverterLeftTemperatureMotors(
    data: ReturnType<typeof deserializePrimaryInverterLeftTemperatureMotors>
) {
    return Uint8Array.from([...byteify.serializeFloat32(data.value)]);
}
export function deserializePrimaryInverterLeftTemperatureMotors(bytes) {
    return {
        value: byteify.deserializeInt16(bytes.slice(0, 2))
    };
}

export function serializePrimaryInverterLeftTorque(data: ReturnType<typeof deserializePrimaryInverterLeftTorque>) {
    return Uint8Array.from([...byteify.serializeFloat32(data.value)]);
}
export function deserializePrimaryInverterLeftTorque(bytes) {
    return {
        value: byteify.deserializeInt16(bytes.slice(0, 2))
    };
}

export function serializePrimaryBmsLvValue(data: ReturnType<typeof deserializePrimaryBmsLvValue>) {
    return Uint8Array.from([...byteify.serializeUint8(data.temperature), ...byteify.serializeUint8(data.voltage)]);
}
export function deserializePrimaryBmsLvValue(bytes) {
    return {
        temperature: byteify.deserializeUint8(bytes.slice(0, 1)),
        voltage: byteify.deserializeUint8(bytes.slice(1, 2))
    };
}

export function serializePrimaryImuGyro(data: ReturnType<typeof deserializePrimaryImuGyro>) {
    return Uint8Array.from([
        ...byteify.serializeInt16(data.x),
        ...byteify.serializeInt16(data.y),
        ...byteify.serializeInt16(data.z)
    ]);
}
export function deserializePrimaryImuGyro(bytes) {
    return {
        x: byteify.deserializeInt16(bytes.slice(0, 2)),
        y: byteify.deserializeInt16(bytes.slice(2, 4)),
        z: byteify.deserializeInt16(bytes.slice(4, 6))
    };
}

export function serializePrimaryImuAccel(data: ReturnType<typeof deserializePrimaryImuAccel>) {
    return Uint8Array.from([
        ...byteify.serializeInt16(data.x),
        ...byteify.serializeInt16(data.y),
        ...byteify.serializeInt16(data.z)
    ]);
}
export function deserializePrimaryImuAccel(bytes) {
    return {
        x: byteify.deserializeInt16(bytes.slice(0, 2)),
        y: byteify.deserializeInt16(bytes.slice(2, 4)),
        z: byteify.deserializeInt16(bytes.slice(4, 6))
    };
}

export function serializePrimaryFrontWheelsEncodersSpeedRads(
    data: ReturnType<typeof deserializePrimaryFrontWheelsEncodersSpeedRads>
) {
    return Uint8Array.from([...byteify.serializeInt32(data.left), ...byteify.serializeInt32(data.right)]);
}
export function deserializePrimaryFrontWheelsEncodersSpeedRads(bytes) {
    return {
        left: byteify.deserializeInt32(bytes.slice(0, 4)),
        right: byteify.deserializeInt32(bytes.slice(4, 8))
    };
}

export function serializePrimaryFrontWheelsEncodersRotationAndKm(
    data: ReturnType<typeof deserializePrimaryFrontWheelsEncodersRotationAndKm>
) {
    return Uint8Array.from([...byteify.serializeUint32(data.rotations), ...byteify.serializeUint32(data.km)]);
}
export function deserializePrimaryFrontWheelsEncodersRotationAndKm(bytes) {
    return {
        rotations: byteify.deserializeUint32(bytes.slice(0, 4)),
        km: byteify.deserializeUint32(bytes.slice(4, 8))
    };
}

export function serializePrimaryPedalsThrottle(data: ReturnType<typeof deserializePrimaryPedalsThrottle>) {
    return Uint8Array.from([...byteify.serializeUint8(data.value)]);
}
export function deserializePrimaryPedalsThrottle(bytes) {
    return {
        value: byteify.deserializeUint8(bytes.slice(0, 1))
    };
}

export function serializePrimaryPedalsBrake(data: ReturnType<typeof deserializePrimaryPedalsBrake>) {
    return Uint8Array.from([
        ...byteify.serializeBool(data.is_breaking),
        ...byteify.serializeUint8(data.__unused_padding_1),
        ...byteify.serializeUint16(data.pressure_front),
        ...byteify.serializeUint16(data.pressure_back)
    ]);
}
export function deserializePrimaryPedalsBrake(bytes) {
    return {
        is_breaking: byteify.deserializeBool(bytes.slice(0, 1)),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __unused_padding_1: byteify.deserializeUint8(bytes.slice(1, 2)),
        pressure_front: byteify.deserializeUint16(bytes.slice(2, 4)),
        pressure_back: byteify.deserializeUint16(bytes.slice(4, 6))
    };
}

export function serializePrimarySteeringWheelEncoder(data: ReturnType<typeof deserializePrimarySteeringWheelEncoder>) {
    return Uint8Array.from([...byteify.serializeUint16(data.value)]);
}
export function deserializePrimarySteeringWheelEncoder(bytes) {
    return {
        value: byteify.deserializeUint16(bytes.slice(0, 2))
    };
}

export function serializePrimarySteeringWheelManettini(
    data: ReturnType<typeof deserializePrimarySteeringWheelManettini>
) {
    return Uint8Array.from([
        ...byteify.serializeUint8(data.control),
        ...byteify.serializeUint8(data.cooling),
        ...byteify.serializeUint8(data.map)
    ]);
}
export function deserializePrimarySteeringWheelManettini(bytes) {
    return {
        control: byteify.deserializeUint8(bytes.slice(0, 1)),
        cooling: byteify.deserializeUint8(bytes.slice(1, 2)),
        map: byteify.deserializeUint8(bytes.slice(2, 3))
    };
}
