import can
from can.interface import Bus
can.rc['interface'] = 'socketcan'
can.rc['channel'] = 'can0'
can.rc['bitrate'] = 500000
bus = Bus()



def parse(id, msg):
    modifiedSensors = []
    
    if(id == 0xB0):
        # PEDALS
        if(msg[0] == 0x01):
            self.pedals.throttle1 = msg[1]
            self.pedals.throttle2 = msg[2]
            self.pedals.time = time.time()
            self.pedals.count += 1
            modifiedSensors.append(self.pedals.type)
            self.pedals.time = timestamp
        if(msg[0] == 0x02):
            # print(msg)
            self.pedals.brake = msg[1]
            self.pedals.front = (msg[2] * 256 + msg[4]) / 500
            self.pedals.back = (msg[5] * 256 + msg[7]) / 500
            self.pedals.time = time.time()
            self.pedals.count += 1
            modifiedSensors.append(self.pedals.type)
            self.pedals.time = timestamp

    if(id == 0x4ED):
        self.a2.scale = 8
        self.a2.x = (msg[0] * 256 + msg[1])
        self.a2.y = (msg[2] * 256 + msg[3])
        self.a2.z = (msg[4] * 256 + msg[5])

        if(self.a2.x > 32768):
            self.a2.x -= 65536
        if(self.a2.y > 32768):
            self.a2.y -= 65536
        if(self.a2.z > 32768):
            self.a2.z -= 65536

        self.a2.x *= (self.a2.scale/65536)*100
        self.a2.y *= (self.a2.scale/65536)*100
        self.a2.z *= (self.a2.scale/65536)*100

        self.a2.x = round(self.a2.x, 2)
        self.a2.y = round(self.a2.y, 2)
        self.a2.z = round(self.a2.z, 2)

        self.a2.time = timestamp
        self.a2.count += 1
        modifiedSensors.append(self.a2.type)

    if(id == 0x4EC):
        self.g2.scale = 245
        self.g2.x = (msg[0] * 256 + msg[1])
        self.g2.y = (msg[2] * 256 + msg[3])
        self.g2.z = (msg[4] * 256 + msg[5])

        if(self.g2.x > 32768):
            self.g2.x -= 65536
        if(self.g2.y > 32768):
            self.g2.y -= 65536
        if(self.g2.z > 32768):
            self.g2.z -= 65536

        self.g2.x *= (self.g2.scale/65536)
        self.g2.y *= (self.g2.scale/65536)
        self.g2.z *= (self.g2.scale/65536)

        self.g2.x = round(self.g2.x, 2)
        self.g2.y = round(self.g2.y, 2)
        self.g2.z = round(self.g2.z, 2)

        self.g2.time = timestamp
        self.g2.count += 1
        modifiedSensors.append(self.g2.type)

    if(id == 0xC0):
        # ACCEL
        if(msg[0] == 0):
            self.a.scale = msg[7]
            self.a.x = (msg[1] * 256 + msg[2])/100 - self.a.scale
            self.a.y = (msg[3] * 256 + msg[4])/100 - self.a.scale
            self.a.z = (msg[5] * 256 + msg[6])/100 - self.a.scale

            self.a.x = round(self.a.x, 3)
            self.a.y = round(self.a.y, 3)
            self.a.z = round(self.a.z, 3)

            self.a.time = timestamp
            self.a.count += 1
            modifiedSensors.append(self.a.type)
        # GYRO
        if(msg[0] == 1):
            self.g.scale = msg[7]*10
            self.g.x = (msg[1] * 256 + msg[2])/10 - self.g.scale
            self.g.y = (msg[3] * 256 + msg[4])/10 - self.g.scale
            self.g.z = (msg[5] * 256 + msg[6])/10 - self.g.scale

            self.g.x = round(self.g.x, 3)
            self.g.y = round(self.g.y, 3)
            self.g.z = round(self.g.z, 3)

            self.g.time = timestamp
            self.g.count += 1
            modifiedSensors.append(self.g.type)

        # STEER
        if(msg[0] == 2):
            self.steer.angle = (msg[1] * 256 + msg[2])/100
            self.steer.angle = round(self.steer.angle, 3)
            self.steer.time = timestamp
            self.steer.count += 1
            modifiedSensors.append(self.steer.type)

    if(id == 0xD0):
        # SPEED
        if(msg[0] == 6):
            self.speed.l_enc = msg[1] * 256 + msg[2]
            self.speed.time = timestamp
            self.speed.count += 1
            modifiedSensors.append(self.speed.type)

        if(msg[0] == 7):
            self.speed.l_rads = (
                (msg[1] << 16) + (msg[2] << 8) + msg[3]) / 10000
            if msg[7] == 1:
                self.speed.l_rads *= -1

            self.speed.time = timestamp
            self.speed.count += 1
            modifiedSensors.append(self.speed.type)

        if(msg[0] == 0x015):
            self.speed.angle0 = (msg[1] * 256 + msg[2]) / 100
            self.speed.angle1 = (msg[3] * 256 + msg[4]) / 100
            self.speed.delta = (msg[5] * 256 + msg[6]) / 100
            self.speed.frequency = msg[7]
            self.speed.count += 1
            self.speed.time = timestamp
            modifiedSensors.append(self.speed.type)

    # ECU
    if(id == 0x55):
        # ECU State
        if(msg[0] == 0x10):
            self.ecu.state = msg[1]
            modifiedSensors.append(self.ecu.type)

        # ECU bms on request
        if(msg[0] == 0x0A):
            self.cmds.active_commands.append(
                ("ECU BMS ON request", time.time())
            )
            modifiedSensors.append(self.cmds.type)

        self.ecu.count += 1

    # STEERING
    if(id == 0xA0):
        if(msg[0] == 0x02):
            if(msg[1] == 0xEC):
                self.ecu.map = -20
            else:
                self.ecu.map = msg[1]
        if(msg[0] == 0x03):
            self.cmds.active_commands.append(
                ("Steering Setup request", time.time())
            )

        if(msg[0] == 0x04):
            self.cmds.active_commands.append(
                ("Steering Stop request", time.time())
            )

        if(msg[0] == 0x05):
            self.cmds.active_commands.append(
                ("Steering RUN request", time.time())
            )
            if(msg[1] == 0xEC):
                self.ecu.map = -20
            else:
                self.ecu.map = msg[1]

        self.steeringWheel.count += 1
        self.steeringWheel.time = timestamp
        modifiedSensors.append(self.steeringWheel.type)

    if(id == 0x201):
        if(msg[0] == 0x51 and msg[1] == 0x08):
            self.cmds.active_commands.append(
                ("Inverter L ON", time.time())
            )
            modifiedSensors.append(self.cmds.type)

    if(id == 0x202):
        if(msg[0] == 0x51 and msg[1] == 0x08):
            self.cmds.active_commands.append(
                ("Inverter R ON", time.time())
            )
            modifiedSensors.append(self.cmds.type)

    # BMS HV
    if(id == 0xAA):
        if(msg[0] == 0x01):
            self.bmsHV.voltage = ((msg[1] << 16) + (msg[2] << 8))/10000
            self.bmsHV.time = timestamp
            modifiedSensors.append(self.bmsHV.type)

        if(msg[0] == 0x05):
            self.bmsHV.current = (msg[1] * 256 + msg[2])/10
            self.bmsHV.time = timestamp
            modifiedSensors.append(self.bmsHV.type)

        if(msg[0] == 0xA0):
            self.bmsHV.temp = (msg[1] * 256 + msg[2]) / 10

            self.bmsHV.time = timestamp
            self.bmsHV.count += 1
            modifiedSensors.append(self.bmsHV)

        if(msg[0] == 0x03):
            self.cmds.active_commands.append(
                ("BMS is ON", time.time())
            )
            modifiedSensors.append(self.cmds.type)
        if(msg[0] == 0x04):
            self.cmds.active_commands.append(
                ("BMS is OFF", time.time())
            )
            modifiedSensors.append(self.cmds.type)
        if(msg[0] == 0x08):
            self.cmds.active_commands.append(
                ("BMS is OFF", time.time())
            )
            modifiedSensors.append(self.cmds.type)

        self.bmsHV.count += 1

    if(id == 0xFF):
        self.bmsLV.voltage = msg[0]/10
        self.bmsLV.temp = msg[2]/5
        self.bmsLV.count += 1
        self.bmsLV.time = timestamp
        modifiedSensors.append(self.bmsLV.type)

    # INVERTER LEFT
    if(id == 0x181):
        if(msg[0] == 0xA0):
            self.invl.torque = (msg[2] * 256 + msg[1])
            self.invl.time = timestamp
        if(msg[0] == 0x4A):
            self.invl.temp = (msg[2] * 256 + msg[1] - 15797) / 112.1182
            self.invl.time = timestamp
        if(msg[0] == 0x49):
            self.invl.motorTemp = (msg[2] * 256 + msg[1] - 9393.9) / 55.1
            self.invl.time = timestamp
        if(msg[0] == 0xA8):
            self.invl.speed = (msg[2] * 256 + msg[1])
            if(self.invl.speed > 32768):
                self.invl.speed -= 65536
            self.invl.time = timestamp

        self.invl.torque = round(self.invl.torque, 3)
        self.invl.temp = round(self.invl.temp, 3)
        self.invl.motorTemp = round(self.invl.motorTemp, 3)
        self.invl.speed = round(self.invl.speed, 3)

        self.invl.count += 1
        modifiedSensors.append(self.invl.type)

    # INVERTER RIGHT
    if(id == 0x182):
        if(msg[0] == 0xA0):
            self.invr.torque = (msg[2] * 256 + msg[1])
            self.invr.time = timestamp
        if(msg[0] == 0x4A):
            self.invr.temp = (msg[2] * 256 + msg[1] - 15797) / 112.1182
            self.invr.time = timestamp
        if(msg[0] == 0x49):
            self.invr.motorTemp = (msg[2] * 256 + msg[1] - 9393.9) / 55.1
            self.invr.time = timestamp
        if(msg[0] == 0xA8):
            self.invr.speed = (msg[2] * 256 + msg[1])
            if(self.invr.speed > 32768):
                self.invr.speed -= 65536
            self.invr.time = timestamp
            '''
            self.invr.speed = (msg[2] * 256 + msg[1])
            if(self.invr.speed > 32768):
                self.invr.speed -= 65536
            self.invr.speed = ((self.invr.speed/(60))*0.395)*3.6
            '''

        self.invr.torque = round(self.invr.torque, 3)
        self.invr.temp = round(self.invr.temp, 3)
        self.invr.motorTemp = round(self.invr.motorTemp, 3)
        self.invr.speed = round(self.invr.speed, 3)
        modifiedSensors.append(self.invr.type)

        self.invr.count += 1

    return modifiedSensors


while True:
        msg = bus.recv(None)
        try:
            parse(msg.arbitration_id, msg.data)
            print(modifiedSensors)

        except AttributeError:
            print("Nothing received this time")