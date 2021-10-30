export const colors = {
  muted: "#838383",
  gray: "#aaaaaa",
  background: "#151515",
  backgrounddark: "#252525",
  blue: "#2e82ff",
  green: "#00DC82",
  red: "#FF6492",
  yellow: "#e8e228",
  purple: "#9189d9",
  white: "hsl(0deg 0% 95%)",
  black: "hsl(0deg 0% 5%)",
  common: "#838383",
  uncommon: "#00DC82",
  rare: "#2e82ff",
  epic: "#c13cff",
  legendary: "#f8b73e",
  mythic: "#ff44b7",
};

export const grayscale = {
  5: "hsl(0deg 0% 5%)",
  10: "hsl(0deg 0% 10%)",
  15: "hsl(0deg 0% 15%)",
  20: "hsl(0deg 0% 20%)",
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
  80: "hsl(0deg 0% 80%)",
  85: "hsl(0deg 0% 85%)",
  90: "hsl(0deg 0% 90%)",
  95: "hsl(0deg 0% 95%)",
}

export const styleLegend = {
  common: {
    color: colors.common,
  },
  uncommon: {
    color: colors.uncommon,
  },
  rare: {
    color: colors.rare,
  },
  epic: {
    color: colors.epic,
  },
  legendary: {
    color: colors.legendary,
  },
  mythic: {
    color: colors.mythic,
  },
}

export function colorForScore(score: number) {
  switch (score) {
    case 6:
      return colors.mythic;
    case 5:
      return colors.legendary;
    case 4:
      return colors.epic;
    case 3:
      return colors.rare;
    case 2:
      return colors.uncommon;
    case 1:
    default:
      return colors.common;
  }
}