const timestampPattern = new RegExp('^\\(?[0-9]+\\.[0-9]+\\)?$');

export default function parseDate(line: string, dateCharSeparator: string): number {
    const timeString = line.split(dateCharSeparator)[0].trim();
    if (timestampPattern.test(timeString)) {
        const millisecond = parseFloat(timeString.replace('(', '').replace(')', '')) * (10 ** 6);
        return Math.floor(millisecond);
    }
    else {
        throw new Error(`No timestamp found on line: ${line}`);
    }
}
