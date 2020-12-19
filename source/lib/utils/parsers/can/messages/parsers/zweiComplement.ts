export function zweiComplement(n: number): number {
    return n > 32768 ? n - 65536 : n;
}
