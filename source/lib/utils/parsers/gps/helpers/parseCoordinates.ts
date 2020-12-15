export function parseCoordinates(value: string): number {
    const temp = +value / 100;
    const left = Math.floor(temp);
    const right = (temp - left) * (5 / 3);
    return left + right;
}