export function extractTimestamp(line: string): number | null {
    const timestampPattern = /^\((?<timestamp>\d+\.\d+)\)/;
    const timestampText = timestampPattern.exec(line)?.groups?.timestamp;

    return timestampText
        ? Math.floor(+timestampText * 10e6)
        : null;
}