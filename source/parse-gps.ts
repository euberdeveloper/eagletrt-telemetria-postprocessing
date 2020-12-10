function parseCoordinates(raw: number) {
    raw /= 100
    const left = Math.floor(raw)
    const right = (raw - left) * (5/3)
    return (left + right) * 100
}

function parseGpsValues (
    msg: string[],
    callback: (props: string, value: any) => void
) {
    if (msg[0] === '$GNGGA') {
        callback('GNGGA', {
            'utc_time': msg[1],
            'latitude': parseCoordinates(parseFloat(msg[2])),
            'ns_indicator': msg[3],
            'longitude': parseCoordinates(parseFloat(msg[4])),
            'ew_indicator': msg[5],
            'status': parseInt(msg[6]),
            'altitude': parseFloat(msg[11]),
        })
    }

    if (msg[0] === '$GNGLL') {
        callback('GNGLL', {
            'latitude': parseCoordinates(parseFloat(msg[1])),
            'ns_indicator': msg[2],
            'longitude': parseCoordinates(parseFloat(msg[3])),
            'ew_indicator': msg[4],
            'utc_time': msg[5],
            'status': msg[6] === 'A',
        })
    }

    if (msg[0] === '$GNRMC') {
        callback('GNRMC', {
            'utc_time': msg[1],
            'status': msg[2] === 'A',
            'latitude': parseCoordinates(parseFloat(msg[3])),
            'ns_indicator': msg[4],
            'longitude': parseCoordinates(parseFloat(msg[5])),
            'ew_indicator': msg[6],
            'ground_speed_knots': parseFloat(msg[7]),
            'date': msg[9],
        })
    }

    if (msg[0] === '$GNVTG') {
        callback('$GNVTG', {
            'ground_speed_knots': parseFloat(msg[5]),
            'ground_speed_human': parseFloat(msg[7]),
        })
    }
}

export default function (
    line: string,
    callback: (props: string, value: any) => void
) {
    parseGpsValues(line.split(','), callback);
}