result = { }
def addToResult(props, value):
    print(props, value)
    tempRes = result
    for p in props[:-1]:
        if p not in tempRes:
            tempRes[p] = { }
        tempRes = tempRes[p]

    if props[-1] in tempRes:
        tempRes[props[-1]].append(value)
    else:
        tempRes[props[-1]] = [value]

def parse(id, msg):
    # inverters right
    if (id == 0x181 or id == 0x182):
        # speed
        if(msg[0] == 0xA8):
            invrspeed = (msg[2] * 256 + msg[1])
            if(invrspeed > 32768):
                invrspeed -= 65536
            addToResult(['inverters', 'right' if id == 0x181 else 'left', 'speed'], invrspeed)
        # temperature_igbt
        if(msg[0] == 0x4A):
            #TODO: check value
            addToResult(['inverters', 'right' if id == 0x181 else 'left', 'temperature_igbt'], (msg[2] * 256 + msg[1] - 15797) / 112.1182)
        # temperature_motors
        if(msg[0] == 0x49):
            #TODO: check value
            addToResult(['inverters', 'right' if id == 0x181 else 'left', 'temperature_motors'], (msg[2] * 256 + msg[1] - 9393.9) / 55.1)
        # torque
        if(msg[0] == 0xA0):
            #TODO: check value
            addToResult(['inverters', 'right' if id == 0x181 else 'left', 'torque'], (msg[2] * 256 + msg[1]))

        # BMS HV
    
    # bms_hv
    if (id == 0xAA):
        # voltage
        if (msg[0] == 0x01):
            addToResult(['bms_hv', 'voltage'], { 
                'total': ((msg[1] << 16) + (msg[2] << 8) + msg[3]) / 10000,
                'max': ((msg[4] << 8) + msg[5]) / 10000,
                'min': ((msg[6] << 8) + msg[7]) / 10000
            })
        # temperature
        if (msg[0] == 0xA0):
            addToResult(['bms_hv', 'temperature'], { 
                'average': ((msg[1] << 8) + msg[2]) / 100,
                'max': ((msg[3] << 8) + msg[4]) / 100,
                'min': ((msg[5] << 8) + msg[6]) / 100
            })
        # current
        if (msg[0] == 0x05):
            addToResult(['bms_hv', 'current'], {
                'current': (msg[1] * 256 + msg[2]) / 10,
                'pow': (msg[3] * 256 + msg[4]) / 10
            })

        # errors warnings
        if (msg[0] == 0x08 or msg[0] == 0x09):
            addToResult(['bms_hv', 'errors' if msg[0] == 0x08 else 'warnings'], {
                'fault_id': msg[1],
                'fault_index': msg[2] / 10
            })

    # bms_lv
    if(id == 0xFF):
        addToResult(['bms_lv', 'values'], {
            'voltage': msg[0] / 10,
            'temperature': msg[2] / 5
        })

    # imu_old
    if(id == 0xC0):
        # accel
        if(msg[0] == 0):
            ascale = msg[7]
            addToResult(['imu_old', 'accel'], {
                'x': ((msg[1] << 8 + msg[2]) / 100) - ascale,
                'y': ((msg[3] << 8 + msg[4]) / 100) - ascale,
                'z': ((msg[5] << 8 + msg[6]) / 100) - ascale,
                'scale': ascale
            })
        # gyro
        if(msg[0] == 1):
            gscale = msg[7] * 10
            addToResult(['imu_old', 'gyro'], {
                'x': ((msg[1] << 8 + msg[2]) / 10) - gscale,
                'y': ((msg[3] << 8 + msg[4]) / 10) - gscale,
                'z': ((msg[5] << 8 + msg[6]) / 10) - gscale,
                'scale': gscale
            })

        # << steering_wheel encoder
        if(msg[0] == 2):
            addToResult(['steering_wheel', 'encoder'], (msg[1] * 256 + msg[2]) / 100)

    # pedals
    if(id == 0xB0):
        # throttle
        if(msg[0] == 0x01):
            addToResult(['pedals', 'throttle'], msg[1])
        # brake
        if(msg[0] == 0x02):
            addToResult(['pedals', 'brake'], {
                'is_breaking': msg[1],
                'pressure_front': ((msg[2] << 8) + msg[4]) / 500,
                'pressure_back': ((msg[5] << 8) + msg[7]) / 500,
            })

    # imu gyro
    if(id == 0x4EC):
        g2scale = 245
        g2x = (msg[0] * 256 + msg[1])
        g2y = (msg[2] * 256 + msg[3])
        g2z = (msg[4] * 256 + msg[5])
        if(g2x > 32768):
            g2x -= 65536
        if(g2y > 32768):
            g2y -= 65536
        if(g2z > 32768):
            g2z -= 65536
        g2x *= (g2scale / 65536)
        g2y *= (g2scale / 65536)
        g2z *= (g2scale / 65536)
        addToResult(['imu', 'gyro'], {
            'x': g2x,
            'y': g2y,
            'z': g2z
        })

    # imu accel
    if(id == 0x4ED):
        a2scale = 8
        a2x = (msg[0] * 256 + msg[1])
        a2y = (msg[2] * 256 + msg[3])
        a2z = (msg[4] * 256 + msg[5])
        if(a2x > 32768):
            a2x -= 65536
        if(a2y > 32768):
            a2y -= 65536
        if(a2z > 32768):
            a2z -= 65536
        a2x *= (a2scale/65536)*100
        a2y *= (a2scale/65536)*100
        a2z *= (a2scale/65536)*100
        addToResult(['imu', 'accel'], {
            'x': g2x,
            'y': g2y,
            'z': g2z
        })

    # front_wheels_encoders
    if(id == 0xD0 or id == 0xD1):
        # speed
        if(msg[0] == 0x06):
            addToResult(['front_wheels_encoders', 'right' if id == 0xD0 else 'left', 'speed'], {
                'speed': ((msg[1] << 8) + msg[2]) * (1 if msg[3] == 0 else -1),
                'error_flag': msg[6]
            })
        # speed_rads
        if(msg[0] == 0x07):
            addToResult(
                ['front_wheels_encoders', 'right' if id == 0xD0 else 'left', 'speed_rads'],
                ((msg[1] << 16) + (msg[2] << 8) + msg[3]) / (-10000 if msg[1] == 1 else 10000)
            )
        # angle
        if(msg[0] == 0x15):
            addToResult(['front_wheels_encoders', 'right' if id == 0xD0 else 'left', 'angle'], {
                'angle_0': ((msg[1] << 8) + msg[2]) / 100,
                'angle_1': ((msg[3] << 8) + msg[4]) / 100,
                'angle_delta': ((msg[5] << 8) + msg[6]) / 100
            })

    # steering_wheel
    if(id == 0xA0):
        # gears
        if(msg[0] == 0x01):
            addToResult(['steering_wheel', 'gears'], {
                'control': msg[1],
                'cooling': msg[2],
                'map': msg[3]
            })

    # distance
    if(id == 0xD0 and msg[0] == 0x08):
        addToResult(['distance'], {
            'meters': (msg[1] << 8) + msg[2],
            'rotations': (msg[3] << 8) + msg[4],
            'angle': msg[5] % 16, #TODO: & 0x000000F 
            'clock_period': msg[6] % 16 #TODO: & 0x000000F 
        })        

def canMessageParse(msg):
    return [
        (msg >> 56) & 0xFF,
        (msg >> 48) & 0xFF,
        (msg >> 40) & 0xFF,
        (msg >> 32) & 0xFF,
        (msg >> 24) & 0xFF,
        (msg >> 16) & 0xFF,
        (msg >> 8) & 0xFF,
        (msg >> 0) & 0xFF,
    ]

messages = [
    [0x0AA, 0x0142D63D9F6B9C90],
    [0x0C0, 0x00018F018F019204]
]

for m in messages:
    parse(m[0], canMessageParse(m[1]))
print(result)
