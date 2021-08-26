/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as byteify from 'byteify';

export function serializeSecondaryBmsHvVoltage(data: ReturnType<typeof deserializeSecondaryBmsHvVoltage>) {
    return Uint8Array.from([
        ...byteify.serializeUint16(data.max),
        ...byteify.serializeUint16(data.min),
        ...byteify.serializeUint32(data.total)
    ]);
}
export function deserializeSecondaryBmsHvVoltage(bytes) {
    return {
        max: byteify.deserializeUint16(bytes.slice(0, 2)),
        min: byteify.deserializeUint16(bytes.slice(2, 4)),
        total: byteify.deserializeUint32(bytes.slice(4, 8))
    };
}

export function serializeSecondaryBmsHvTemperature(data: ReturnType<typeof deserializeSecondaryBmsHvTemperature>) {
    return Uint8Array.from([
        ...byteify.serializeUint16(data.average),
        ...byteify.serializeUint16(data.max),
        ...byteify.serializeUint16(data.min)
    ]);
}
export function deserializeSecondaryBmsHvTemperature(bytes) {
    return {
        average: byteify.deserializeUint16(bytes.slice(0, 2)),
        max: byteify.deserializeUint16(bytes.slice(2, 4)),
        min: byteify.deserializeUint16(bytes.slice(4, 6))
    };
}

export function serializeSecondaryBmsHvCurrent(data: ReturnType<typeof deserializeSecondaryBmsHvCurrent>) {
    return Uint8Array.from([...byteify.serializeUint16(data.current), ...byteify.serializeUint16(data.pow)]);
}
export function deserializeSecondaryBmsHvCurrent(bytes) {
    return {
        current: byteify.deserializeUint16(bytes.slice(0, 2)),
        pow: byteify.deserializeUint16(bytes.slice(2, 4))
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
