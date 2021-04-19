export function zweiComplement(n: number): number {
    return n > 32_768 ? n - 65_536 : n;
}
