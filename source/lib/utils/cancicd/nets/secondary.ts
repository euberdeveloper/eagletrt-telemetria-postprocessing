/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as byteify from 'byteify';

export function serializeSecondaryBmsHvVoltage(data: ReturnType<typeof deserializeSecondaryBmsHvVoltage>) {
    return Uint8Array.from([
        ...byteify.serializeUint16(data.max).reverse(),
        ...byteify.serializeUint16(data.min).reverse(),
        ...byteify.serializeUint32(data.total).reverse()
    ]);
}
export function deserializeSecondaryBmsHvVoltage(bytes) {
    return {
        max: byteify.deserializeUint16(bytes.slice(0, 2).reverse()),
        min: byteify.deserializeUint16(bytes.slice(2, 4).reverse()),
        total: byteify.deserializeUint32(bytes.slice(4, 8).reverse())
    };
}

export function serializeSecondaryBmsHvTemperature(data: ReturnType<typeof deserializeSecondaryBmsHvTemperature>) {
    return Uint8Array.from([
        ...byteify.serializeUint16(data.average).reverse(),
        ...byteify.serializeUint16(data.max).reverse(),
        ...byteify.serializeUint16(data.min).reverse()
    ]);
}
export function deserializeSecondaryBmsHvTemperature(bytes) {
    return {
        average: byteify.deserializeUint16(bytes.slice(0, 2).reverse()),
        max: byteify.deserializeUint16(bytes.slice(2, 4).reverse()),
        min: byteify.deserializeUint16(bytes.slice(4, 6).reverse())
    };
}

export function serializeSecondaryBmsHvCurrent(data: ReturnType<typeof deserializeSecondaryBmsHvCurrent>) {
    return Uint8Array.from([
        ...byteify.serializeUint16(data.current).reverse(),
        ...byteify.serializeUint16(data.pow).reverse()
    ]);
}
export function deserializeSecondaryBmsHvCurrent(bytes) {
    return {
        current: byteify.deserializeUint16(bytes.slice(0, 2).reverse()),
        pow: byteify.deserializeUint16(bytes.slice(2, 4).reverse())
    };
}

export function serializeSecondaryBmsHvErrors(data: ReturnType<typeof deserializeSecondaryBmsHvErrors>) {
    return Uint8Array.from([
        ...byteify.serializeUint8(data.fault_id).reverse(),
        ...byteify.serializeUint8(data.fault_index).reverse()
    ]);
}
export function deserializeSecondaryBmsHvErrors(bytes) {
    return {
        fault_id: byteify.deserializeUint8(bytes.slice(0, 1).reverse()),
        fault_index: byteify.deserializeUint8(bytes.slice(1, 2).reverse())
    };
}

export function serializeSecondaryBmsHvWarnings(data: ReturnType<typeof deserializeSecondaryBmsHvWarnings>) {
    return Uint8Array.from([
        ...byteify.serializeUint8(data.fault_id).reverse(),
        ...byteify.serializeUint8(data.fault_index).reverse()
    ]);
}
export function deserializeSecondaryBmsHvWarnings(bytes) {
    return {
        fault_id: byteify.deserializeUint8(bytes.slice(0, 1).reverse()),
        fault_index: byteify.deserializeUint8(bytes.slice(1, 2).reverse())
    };
}
