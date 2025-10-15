export function generateColorShades(baseHue = 120, count = 5) {
    if (count <= 0) return [];
    const colors = [];
    for (let i = 0; i < count; i++) {
        const lightness = 40 + i * (40 / count); // From 40% to 80%
        colors.push(`hsl(${baseHue}, 70%, ${lightness}%)`);
    }
    return colors;
}