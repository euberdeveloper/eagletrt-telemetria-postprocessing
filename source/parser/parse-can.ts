function parseCanValues(
    id: number,
    msg: number[],
    callback: (props: string[], value: any) => void
) {

    // inverters right
    if (id === 0x181 || id === 0x182) {
        // speed
        if (msg[0] === 0xA8) {
            let invrspeed = (msg[2] * 256 + msg[1])
            if (invrspeed > 32768)
                invrspeed -= 65536
            callback(['inverters', id === 0x181 ? 'right' : 'left', 'speed'], invrspeed)
        }
        // temperature_igbt
        if (msg[0] === 0x4A) {
            //TODO: check value
            callback(['inverters', id === 0x181 ? 'right' : 'left', 'temperature_igbt'], (msg[2] * 256 + msg[1] - 15797) / 112.1182)
        }
        // temperature_motors
        if (msg[0] === 0x49) {
            //TODO: check value
            callback(['inverters', id === 0x181 ? 'right' : 'left', 'temperature_motors'], (msg[2] * 256 + msg[1] - 9393.9) / 55.1)
        }
        // torque
        if (msg[0] === 0xA0) {
            //TODO: check value
            callback(['inverters', id === 0x181 ? 'right' : 'left', 'torque'], (msg[2] * 256 + msg[1]))
        }
    }

    // bms_hv
    if (id === 0xAA) {
        // voltage
        if (msg[0] === 0x01) {
            callback(['bms_hv', 'voltage'], {
                'total': ((msg[1] << 16) + (msg[2] << 8) + msg[3]) / 10000,
                'max': ((msg[4] << 8) + msg[5]) / 10000,
                'min': ((msg[6] << 8) + msg[7]) / 10000
            })
        }
        // temperature
        if (msg[0] === 0xA0) {
            callback(['bms_hv', 'temperature'], {
                'average': ((msg[1] << 8) + msg[2]) / 100,
                'max': ((msg[3] << 8) + msg[4]) / 100,
                'min': ((msg[5] << 8) + msg[6]) / 100
            })
        }
        // current
        if (msg[0] === 0x05) {
            callback(['bms_hv', 'current'], {
                'current': (msg[1] * 256 + msg[2]) / 10,
                'pow': (msg[3] * 256 + msg[4]) / 10
            })
        }
        // errors warnings
        if (msg[0] === 0x08 || msg[0] === 0x09) {
            callback(['bms_hv', msg[0] === 0x08 ? 'errors' : 'warnings'], {
                'fault_id': msg[1],
                'fault_index': msg[2] / 10
            })
        }
    }

    // bms_lv
    if (id === 0xFF) {
        callback(['bms_lv', 'values'], {
            'voltage': msg[0] / 10,
            'temperature': msg[2] / 5
        })
    }

    // imu_old
    if (id === 0xC0) {
        // accel
        if (msg[0] === 0) {
            const ascale = msg[7]
            callback(['imu_old', 'accel'], {
                'x': ((msg[1] << 8 + msg[2]) / 100) - ascale,
                'y': ((msg[3] << 8 + msg[4]) / 100) - ascale,
                'z': ((msg[5] << 8 + msg[6]) / 100) - ascale,
                'scale': ascale
            })
        }
        // gyro
        if (msg[0] === 1) {
            const gscale = msg[7] * 10
            callback(['imu_old', 'gyro'], {
                'x': ((msg[1] << 8 + msg[2]) / 10) - gscale,
                'y': ((msg[3] << 8 + msg[4]) / 10) - gscale,
                'z': ((msg[5] << 8 + msg[6]) / 10) - gscale,
                'scale': gscale
            })
        }
        // << steering_wheel encoder
        if (msg[0] === 2) {
            callback(['steering_wheel', 'encoder'], (msg[1] * 256 + msg[2]) / 100)
        }
    }

    // pedals
    if (id === 0xB0) {
        // throttle
        if (msg[0] === 0x01) {
            callback(['pedals', 'throttle'], msg[1])
        }
        // brake
        if (msg[0] === 0x02) {
            callback(['pedals', 'brake'], {
                'is_breaking': msg[1],
                'pressure_front': ((msg[2] << 8) + msg[4]) / 500,
                'pressure_back': ((msg[5] << 8) + msg[7]) / 500,
            })
        }
    }

    // imu gyro
    if (id === 0x4EC) {
        const g2scale = 245
        let g2x = (msg[0] * 256 + msg[1])
        let g2y = (msg[2] * 256 + msg[3])
        let g2z = (msg[4] * 256 + msg[5])
        if (g2x > 32768)
            g2x -= 65536
        if (g2y > 32768)
            g2y -= 65536
        if (g2z > 32768)
            g2z -= 65536
        g2x *= (g2scale / 65536)
        g2y *= (g2scale / 65536)
        g2z *= (g2scale / 65536)
        callback(['imu', 'gyro'], {
            'x': g2x,
            'y': g2y,
            'z': g2z
        })
    }

    // imu accel
    if (id === 0x4ED) {
        const a2scale = 8
        let a2x = (msg[0] * 256 + msg[1])
        let a2y = (msg[2] * 256 + msg[3])
        let a2z = (msg[4] * 256 + msg[5])
        if (a2x > 32768)
            a2x -= 65536
        if (a2y > 32768)
            a2y -= 65536
        if (a2z > 32768)
            a2z -= 65536
        a2x *= (a2scale / 65536) * 100
        a2y *= (a2scale / 65536) * 100
        a2z *= (a2scale / 65536) * 100
        callback(['imu', 'accel'], {
            'x': a2x,
            'y': a2y,
            'z': a2z
        })
    }

    // front_wheels_encoders
    if (id === 0xD0 || id === 0xD1) {
        // speed
        if (msg[0] === 0x06) {
            callback(['front_wheels_encoders', id === 0xD0 ? 'right' : 'left', 'speed'], {
                'speed': ((msg[1] << 8) + msg[2]) * (msg[3] === 0 ? 1 : -1),
                'error_flag': msg[6]
            })
        }
        // speed_rads
        if (msg[0] === 0x07) {
            callback(
                ['front_wheels_encoders', id === 0xD0 ? 'right' : 'left', 'speed_rads'],
                ((msg[1] << 16) + (msg[2] << 8) + msg[3]) / (msg[1] === 1 ? -10000 : 10000)
            )
        }
        // angle
        if (msg[0] === 0x15) {
            callback(['front_wheels_encoders', id === 0xD0 ? 'right' : 'left', 'angle'], {
                'angle_0': ((msg[1] << 8) + msg[2]) / 100,
                'angle_1': ((msg[3] << 8) + msg[4]) / 100,
                'angle_delta': ((msg[5] << 8) + msg[6]) / 100
            })
        }
    }
    // steering_wheel
    if (id === 0xA0) {
        // gears
        if (msg[0] === 0x01) {
            callback(['steering_wheel', 'gears'], {
                'control': msg[1],
                'cooling': msg[2],
                'map': msg[3]
            })
        }
    }

    // distance
    if (id === 0xD0 && msg[0] === 0x08) {
        callback(['distance'], {
            'meters': (msg[1] << 8) + msg[2],
            'rotations': (msg[3] << 8) + msg[4],
            'angle': msg[5] & 0x0F,
            'clock_period': msg[6] & 0x0F
        })
    }

}

export default function(
    line: string,
    callback: (props: string[], value: any) => void
) {
    const l = line.split(' ')[2].split('#');
    const canMessageValue = parseInt(l[1].padEnd(16, '0'), 16);
    
    const id = parseInt(l[0], 16);
    const msgs = [
        (canMessageValue >> 56) & 0xFF,
        (canMessageValue >> 48) & 0xFF,
        (canMessageValue >> 40) & 0xFF,
        (canMessageValue >> 32) & 0xFF,
        (canMessageValue >> 24) & 0xFF,
        (canMessageValue >> 16) & 0xFF,
        (canMessageValue >> 8) & 0xFF,
        (canMessageValue >> 0) & 0xFF,
    ];
    parseCanValues(id, msgs, callback);
}