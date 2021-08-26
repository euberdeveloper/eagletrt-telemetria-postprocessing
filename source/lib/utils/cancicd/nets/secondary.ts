/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as byteify from 'byteify';

export function serializeSecondaryBmsHvVoltage(data: ReturnType<typeof deserializeSecondaryBmsHvVoltage>) {
    return Uint8Array.from([
        ...byteify.serializeFloat32(data.max),
        ...byteify.serializeFloat32(data.min),
        ...byteify.serializeFloat32(data.total)
    ]);
}
export function deserializeSecondaryBmsHvVoltage(bytes) {
    return {
        max: byteify.deserializeFloat32(bytes.slice(0, 2)),
        min: byteify.deserializeFloat32(bytes.slice(2, 4)),
        total: byteify.deserializeFloat32(bytes.slice(4, 8))
    };
}

export function serializeSecondaryBmsHvTemperature(data: ReturnType<typeof deserializeSecondaryBmsHvTemperature>) {
    return Uint8Array.from([
        ...byteify.serializeFloat32(data.average),
        ...byteify.serializeFloat32(data.max),
        ...byteify.serializeFloat32(data.min)
    ]);
}
export function deserializeSecondaryBmsHvTemperature(bytes) {
    return {
        average: byteify.deserializeFloat32(bytes.slice(0, 2)),
        max: byteify.deserializeFloat32(bytes.slice(2, 4)),
        min: byteify.deserializeFloat32(bytes.slice(4, 6))
    };
}

export function serializeSecondaryBmsHvCurrent(data: ReturnType<typeof deserializeSecondaryBmsHvCurrent>) {
    return Uint8Array.from([...byteify.serializeFloat32(data.current), ...byteify.serializeFloat32(data.pow)]);
}
export function deserializeSecondaryBmsHvCurrent(bytes) {
    return {
        current: byteify.deserializeFloat32(bytes.slice(0, 2)),
        pow: byteify.deserializeFloat32(bytes.slice(2, 4))
    };
}

export function serializeSecondaryBmsHvErrors(data: ReturnType<typeof deserializeSecondaryBmsHvErrors>) {
    return Uint8Array.from([...byteify.serializeUint8(data.fault_id), ...byteify.serializeUint8(data.fault_index)]);
}
export function deserializeSecondaryBmsHvErrors(bytes) {
    return {
        fault_id: byteify.deserializeUint8(bytes.slice(0, 1)),
        fault_index: byteify.deserializeUint8(bytes.slice(1, 2))
    };
}

export function serializeSecondaryBmsHvWarnings(data: ReturnType<typeof deserializeSecondaryBmsHvWarnings>) {
    return Uint8Array.from([...byteify.serializeUint8(data.fault_id), ...byteify.serializeUint8(data.fault_index)]);
}
export function deserializeSecondaryBmsHvWarnings(bytes) {
    return {
        fault_id: byteify.deserializeUint8(bytes.slice(0, 1)),
        fault_index: byteify.deserializeUint8(bytes.slice(1, 2))
    };
}
