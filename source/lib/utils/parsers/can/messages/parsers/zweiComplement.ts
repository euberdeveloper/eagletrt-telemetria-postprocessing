export function zweiComplement(n: number): number {
    return n > 32_767 ? n - 65_535 : n;
}
