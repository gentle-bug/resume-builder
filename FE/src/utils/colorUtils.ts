const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ]
}

const rgbToHex = (r: number, g: number, b: number): string => {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)))
  return '#' + [clamp(r), clamp(g), clamp(b)].map(v => v.toString(16).padStart(2, '0')).join('')
}

export const lighten = (hex: string, pct: number): string => {
  const [r, g, b] = hexToRgb(hex)
  const f = pct / 100
  return rgbToHex(r + (255 - r) * f, g + (255 - g) * f, b + (255 - b) * f)
}

export const darken = (hex: string, pct: number): string => {
  const [r, g, b] = hexToRgb(hex)
  const f = 1 - pct / 100
  return rgbToHex(r * f, g * f, b * f)
}

export const alpha = (hex: string, a: number): string => {
  const [r, g, b] = hexToRgb(hex)
  return `rgba(${r},${g},${b},${a})`
}
