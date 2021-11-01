import { DefaultTheme } from 'styled-components'

export const colors = {
  common: "hsl(0deg 0% 50%)",
  uncommon: "hsl(155deg 100% 45%)",
  rare: "hsl(215deg 100% 60%)",
  epic: "hsl(280deg 100% 60%)",
  legendary: "hsl(40deg 100% 60%)",
  mythic: "hsl(325deg 100% 60%)",
};

export const grayscale = {
  5: "hsl(0deg 0% 7%)",
  10: "hsl(0deg 0% 8.5%)",
  15: "hsl(0deg 0% 10%)",
  20: "hsl(0deg 0% 15%)",
  25: "hsl(0deg 0% 25%)",
  30: "hsl(0deg 0% 30%)",
  35: "hsl(0deg 0% 35%)",
  40: "hsl(0deg 0% 40%)",
  45: "hsl(0deg 0% 45%)",
  50: "hsl(0deg 0% 50%)",
  55: "hsl(0deg 0% 55%)",
  60: "hsl(0deg 0% 60%)",
  65: "hsl(0deg 0% 65%)",
  70: "hsl(0deg 0% 70%)",
  75: "hsl(0deg 0% 75%)",
  80: "hsl(0deg 0% 85%)",
  85: "hsl(0deg 0% 90%)",
  90: "hsl(0deg 0% 91.5%)",
  95: "hsl(0deg 0% 93%)",
}

export const hues = {
  common: 0,
  uncommon: 155,
  rare: 215,
  epic: 280,
  legendary: 40,
  mythic: 320,
}

export const grayscales = {
  common: grayscale,
  uncommon: grayscaleTint(hues.uncommon),
  rare: grayscaleTint(hues.rare),
  epic: grayscaleTint(hues.epic),
  legendary: grayscaleTint(hues.legendary),
  mythic: grayscaleTint(hues.mythic),
}

export function grayscaleTint (hue: number = 0) {
  return {
    5: `hsl(${hue}deg 75% 7%)`,
    10: `hsl(${hue}deg 75% 8.5%)`,
    15: `hsl(${hue}deg 75% 10%)`,
    20: `hsl(${hue}deg 75% 15%)`,
    25: `hsl(${hue}deg 75% 25%)`,
    30: `hsl(${hue}deg 75% 30%)`,
    35: `hsl(${hue}deg 75% 35%)`,
    40: `hsl(${hue}deg 75% 40%)`,
    45: `hsl(${hue}deg 75% 45%)`,
    50: `hsl(${hue}deg 75% 50%)`,
    55: `hsl(${hue}deg 75% 55%)`,
    60: `hsl(${hue}deg 75% 60%)`,
    65: `hsl(${hue}deg 75% 65%)`,
    70: `hsl(${hue}deg 75% 70%)`,
    75: `hsl(${hue}deg 75% 75%)`,
    80: `hsl(${hue}deg 75% 85%)`,
    85: `hsl(${hue}deg 75% 90%)`,
    90: `hsl(${hue}deg 75% 91.5%)`,
    95: `hsl(${hue}deg 75% 93%)`,
  }
}

export type Hue = keyof typeof hues
export type Color = keyof typeof colors
export type Grayscale = keyof typeof grayscale

export default { colors, grayscale } as DefaultTheme
