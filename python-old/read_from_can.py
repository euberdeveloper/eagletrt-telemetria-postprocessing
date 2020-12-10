from can.interface import Bus
import can
can.rc['interface'] = 'socketcan'
can.rc['channel'] = 'can0'
can.rc['bitrate'] = 500000
bus = Bus()

result = { }
def addToResult(props, value):
    tempRes = result
    for p in props[:-1]:
        if p not in tempRes:
            tempRes[p] = { }
        tempRes = tempRes[p]

    if tempRes[props[-1]]:
        tempRes[props[-1]].append(value)
    else:
        tempRes[props[-1]] = [value]


def parse(id, msg):
    print(msg)
    modifiedSensors = []

    if(id == 0xB0):
        # PEDALS
        if(msg[0] == 0x01):
            print('pedals.throttle1', msg[1])
            print('pedals.throttle2', msg[2])
            # print('pedals.time', time.time())
            # self.pedals.count += 1
            modifiedSensors.append('pedals.type')
            # self.pedals.time = timestamp
        if(msg[0] == 0x02):
            # print(msg)
            print('pedals.brake', msg[1])
            print('pedals.front', (msg[2] * 256 + msg[4]) / 500)
            print('pedals.back', (msg[5] * 256 + msg[7]) / 500)
            # print('pedals.time', time.time())
            # self.pedals.count += 1
            modifiedSensors.append('pedals.type')
            # self.pedals.time = timestamp

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

        print('a2.x', a2x)
        print('a2.y', a2y)
        print('a2.z', a2z)

        # self.a2.time = timestamp
        # self.a2.count += 1
        modifiedSensors.append('a2.type')

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

        g2x *= (g2scale/65536)
        g2y *= (g2scale/65536)
        g2z *= (g2scale/65536)

        print('g2.x', g2x)
        print('g2.y', g2y)
        print('g2.z', g2z)

        # self.g2.time = timestamp
        # self.g2.count += 1
        modifiedSensors.append('g2.type')

    if(id == 0xC0):
        # ACCEL
        if(msg[0] == 0):
            scale = msg[7]
            ax = (msg[1] * 256 + msg[2])/100 - scale
            ay = (msg[3] * 256 + msg[4])/100 - scale
            az = (msg[5] * 256 + msg[6])/100 - scale

            print('a.x', ax)
            print('a.y', ay)
            print('a.z', az)
            # self.a.time = timestamp
            # self.a.count += 1
            modifiedSensors.append('a.type')
        # GYRO
        if(msg[0] == 1):
            gscale = msg[7]*10
            gx = (msg[1] * 256 + msg[2])/10 - gscale
            gy = (msg[3] * 256 + msg[4])/10 - gscale
            gz = (msg[5] * 256 + msg[6])/10 - gscale

            print(gx)
            print(gy)
            print(gz)

            # self.g.time = timestamp
            # self.g.count += 1
            modifiedSensors.append('g.type')

        # STEER
        if(msg[0] == 2):
            steerangle = (msg[1] * 256 + msg[2])/100
            print('steer.angle', steerangle)
            # self.steer.time = timestamp
            # self.steer.count += 1
            modifiedSensors.append('steer.type')

    if(id == 0xD0):
        # SPEED
        if(msg[0] == 6):
            print('speed.l_enc', msg[1] * 256 + msg[2])
            #print('speed.time', timestamp)
            # self.speed.count += 1
            modifiedSensors.append('speed.type')

        if(msg[0] == 7):
            speedl_rads = ((msg[1] << 16) + (msg[2] << 8) + msg[3]) / 10000
            if msg[7] == 1:
                speedl_rads *= -1
            print(speedl_rads)

            # self.speed.time = timestamp
            # self.speed.count += 1
            modifiedSensors.append('speed.type')

        if(msg[0] == 0x015):
            print('speed.angle0', (msg[1] * 256 + msg[2]) / 100)
            print('speed.angle1', (msg[3] * 256 + msg[4]) / 100)
            print('speed.delta', (msg[5] * 256 + msg[6]) / 100)
            print('speed.frequency', msg[7])
            # self.speed.count += 1
            # self.speed.time = timestamp
            modifiedSensors.append('speed.type')

    # ECU
    if(id == 0x55):
        # ECU State
        if(msg[0] == 0x10):
            print('ecu.state', msg[1])
            modifiedSensors.append('ecu.type')

        # ECU bms on request
        if(msg[0] == 0x0A):
            print('cmds.active_commands', "PUSH: ECU BMS ON request")
            modifiedSensors.append('cmds.type')

        # self.ecu.count += 1

    # STEERING
    if(id == 0xA0):
        if(msg[0] == 0x02):
            if(msg[1] == 0xEC):
                print('ecu.map', -20)
            else:
                print('ecu.map', msg[1])
        if(msg[0] == 0x03):
            print('cmds.active_commands', "PUSH: Steering Setup request")

        if(msg[0] == 0x04):
            print('cmds.active_commands', "PUSH: Steering Stop request")

        if(msg[0] == 0x05):
            print('cmds.active_commands', "PUSH: Steering RUN request")

            if(msg[1] == 0xEC):
                print('ecu.map', -20)
            else:
                print('ecu.map', msg[1])

        # self.steeringWheel.count += 1
        # self.steeringWheel.time = timestamp
        modifiedSensors.append('steeringWheel.type')

    if(id == 0x201):
        if(msg[0] == 0x51 and msg[1] == 0x08):
            print('cmds.active_commands', "PUSH: Inverter L ON")
            modifiedSensors.append('cmds.type')

    if(id == 0x202):
        if(msg[0] == 0x51 and msg[1] == 0x08):
            print('cmds.active_commands', "PUSH: Inverter R ON")
            modifiedSensors.append('cmds.type')

    # BMS HV
    if(id == 0xAA):
        if(msg[0] == 0x01):
            print('bmsHV.voltage', ((msg[1] << 16) + (msg[2] << 8) + (msg[3]))/10000)
            # self.bmsHV.time = timestamp
            modifiedSensors.append('bmsHV.type')

        if(msg[0] == 0x05):
            print('bmsHV.current', (msg[1] * 256 + msg[2])/10)
            # self.bmsHV.time = timestamp
            modifiedSensors.append('bmsHV.type')

        if(msg[0] == 0xA0):
            print('bmsHV.temp', (msg[1] * 256 + msg[2]) / 10)

            # self.bmsHV.time = timestamp
            # self.bmsHV.count += 1
            modifiedSensors.append('bmsHV')

        if(msg[0] == 0x03):
            print('cmds.active_commands', "PUSH: BMS is ON")
            modifiedSensors.append('cmds.type')
        if(msg[0] == 0x04):
            print('cmds.active_commands', "PUSH: BMS is OFF")
            modifiedSensors.append('cmds.type')
        if(msg[0] == 0x08):
            print('cmds.active_commands', "PUSH: BMS is OFF")
            modifiedSensors.append('cmds.type')

        # self.bmsHV.count += 1

    if(id == 0xFF):
        print('bmsLV.voltage', msg[0]/10)
        print('bmsLV.temp', msg[2]/5)
        # self.bmsLV.count += 1
        # self.bmsLV.time = timestamp
        modifiedSensors.append('bmsLV.type')

    # INVERTER LEFT
    if(id == 0x181):
        if(msg[0] == 0xA0):
            print('invl.torque', msg[2] * 256 + msg[1])
            # self.invl.time = timestamp
        if(msg[0] == 0x4A):
            print('invl.temp', (msg[2] * 256 + msg[1] - 15797) / 112.1182)
            # self.invl.time = timestamp
        if(msg[0] == 0x49):
            print('invl.motorTemp', (msg[2] * 256 + msg[1] - 9393.9) / 55.1)
            # self.invl.time = timestamp
        if(msg[0] == 0xA8):
            invlspeed = (msg[2] * 256 + msg[1])
            if(invlspeed > 32768):
                invlspeed -= 65536
            print('invl.speed', invlspeed)
            # self.invl.time = timestamp

        # self.invl.count += 1
        modifiedSensors.append('invl.type')

    # INVERTER RIGHT
    if(id == 0x182):
        if(msg[0] == 0xA0):
            print('invr.torque', (msg[2] * 256 + msg[1]))
            # self.invr.time = timestamp
        if(msg[0] == 0x4A):
            print('invr.temp', (msg[2] * 256 + msg[1] - 15797) / 112.1182)
            # self.invr.time = timestamp
        if(msg[0] == 0x49):
            print('invr.motorTemp', (msg[2] * 256 + msg[1] - 9393.9) / 55.1)
            # self.invr.time = timestamp
        if(msg[0] == 0xA8):
            invrspeed = (msg[2] * 256 + msg[1])
            if(invrspeed > 32768):
                invrspeed -= 65536
            print('invr.speed', invrspeed)
            # self.invr.time = timestamp
            '''
            self.invr.speed = (msg[2] * 256 + msg[1])
            if(self.invr.speed > 32768):
                self.invr.speed -= 65536
            self.invr.speed = ((self.invr.speed/(60))*0.395)*3.6
            '''

        modifiedSensors.append('invr.type')

        #self.invr.count += 1

    return modifiedSensors


while True:
    msg = bus.recv(None)
    try:
        modifiedSensors = parse(msg.arbitration_id, msg.data)
        print(modifiedSensors)
        print('')

    except AttributeError:
        print("Nothing received this time")
