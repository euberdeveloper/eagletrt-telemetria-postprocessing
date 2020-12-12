function parseCoordinates(raw: string) {
    let value = parseFloat(raw);
    const temp = +value / 100;
    const left = Math.floor(temp);
    const right = (temp - left) * (5 / 3);
    return left + right;
}

function parseGpsValues(
    msg: string[],
    callback: (props: string[], value: any) => void
) {
    if (msg[0] === '$GNGGA') {
        callback(['gps', 'new', 'gga'], {
            utc_time: parseFloat(msg[1]),
            latitude: parseCoordinates(msg[2]),
            longitude: parseCoordinates(msg[4]),
            altitude: parseFloat(msg[11]),
            speed_knots: NaN,
            course: NaN
            // ew_indicator: msg[5],
            // status: parseInt(msg[6]),
            // ns_indicator: msg[3],
        });
    }

    if (msg[0] === '$GNGLL') {
        callback(['gps', 'new', 'gll'], {
            utc_time: parseFloat(msg[5]),
            latitude: parseCoordinates(msg[1]),
            longitude: parseCoordinates(msg[3]),
            altitude: NaN,
            speed_knots: NaN,
            course: NaN
            // ns_indicator: msg[2],
            // ew_indicator: msg[4],
            // status: msg[6] === 'A',
        });
    }

    if (msg[0] === '$GNRMC') {
        callback(['gps', 'new', 'rmc'], {
            utc_time: parseFloat(msg[1]),
            latitude: parseCoordinates(msg[3]),
            longitude: parseCoordinates(msg[5]),
            altitude: NaN,
            speed_knots: parseFloat(msg[7]),
            course: parseFloat(msg[8])
            // status: msg[2] === 'A',
            // ns_indicator: msg[4],
            // ew_indicator: msg[6],
            // ground_speed_knots: parseFloat(msg[7]),
            // date: msg[9],
        });
    }

    if (msg[0] === '$GNVTG') {
        callback(['gps', 'new', 'vtc'], {
            ground_speed_knots: parseFloat(msg[5]),
            ground_speed_human: parseFloat(msg[7])
        });
    }
}

export default function(
    line: string,
    callback: (props: string[], value: any) => void
) {
    if (line)
        parseGpsValues(line.split('\t').pop()?.split(',') ?? [], callback);
}