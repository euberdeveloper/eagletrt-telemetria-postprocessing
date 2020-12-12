
const timestampPattern = new RegExp('^\\(?[0-9]+\\.[0-9]+\\)?$');

export default function parseDate(line: string): number {
    const timeString = line.split(' ')[0].trim()
    if (timestampPattern.test(timeString)) {
        const millisecond = parseFloat(timeString.replace('(', '').replace(')', '')) * (10 ** 6);
        return Math.floor(millisecond);
    } else {
        throw new Error(`No timestamp found on line: ${line}`)
    }
}
