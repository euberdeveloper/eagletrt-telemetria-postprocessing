import json
import sys
import math

LOG = False
result = { }
def addToResult(prop, value):
    if LOG:
        print(prop, value)

    if prop in result:
        result[prop].append(value)
    else:
        result[prop] = [value]

def parseCoordinates(raw: float):
    raw /= 100
    left = math.floor(raw)
    right = (raw - left) * (5/3)
    return (left + right) * 100

def parse(msg):
    if msg[0] == '$GNGGA':
        addToResult('GNGGA', {
            'utc_time': msg[1],
            'latitude': parseCoordinates(float(msg[2])),
            'ns_indicator': msg[3],
            'longitude': parseCoordinates(float(msg[4])),
            'ew_indicator': msg[5],
            'status': int(msg[6]),
            'altitude': float(msg[11]),
        })

    if msg[0] == '$GNGLL':
        addToResult('GNGLL', {
            'latitude': parseCoordinates(float(msg[1])),
            'ns_indicator': msg[2],
            'longitude': parseCoordinates(float(msg[3])),
            'ew_indicator': msg[4],
            'utc_time': msg[5],
            'status': msg[6] == 'A',
        })

    if msg[0] == '$GNRMC':
        addToResult('GNRMC', {
            'utc_time': msg[1],
            'status': msg[2] == 'A',
            'latitude': parseCoordinates(float(msg[3])),
            'ns_indicator': msg[4],
            'longitude': parseCoordinates(float(msg[5])),
            'ew_indicator': msg[6],
            'ground_speed_knots': float(msg[7]),
            'date': msg[9],
        })

    if msg[0] == '$GNVTG':
        addToResult('$GNVTG', {
            'ground_speed_knots': float(msg[5]),
            'ground_speed_human': float(msg[7]),
        })

def parseLine(line):
    parse(line.split(','))

if len(sys.argv) != 2 and len(sys.argv) != 3:
    print('Usage: main.py <input gps.log file> <output json file>')
    quit()


CANLOG_FILE = sys.argv[1]
JSON_FILE = 'result.json' if len(sys.argv) == 2 else sys.argv[2]

file = open(CANLOG_FILE, 'r').read()
for line in file.split('\n'):
    parseLine(line)

with open(JSON_FILE, 'w') as fp:
    json.dump(result, fp)
