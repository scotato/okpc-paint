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
  white: "hsl(128deg 5% 95%)",
  black: "hsl(128deg 5% 5%)",
  common: "#838383",
  uncommon: "#00DC82",
  rare: "#2e82ff",
  epic: "#c13cff",
  legendary: "#f8b73e",
  mythic: "#ff44b7",
};

export const grayscale = {
  5: "hsl(128deg 5% 7%)",
  10: "hsl(128deg 5% 8.5%)",
  15: "hsl(128deg 5% 10%)",
  20: "hsl(128deg 5% 15%)",
  25: "hsl(128deg 5% 25%)",
  30: "hsl(128deg 5% 30%)",
  35: "hsl(128deg 5% 35%)",
  40: "hsl(128deg 5% 40%)",
  45: "hsl(128deg 5% 45%)",
  50: "hsl(128deg 5% 50%)",
  55: "hsl(128deg 5% 55%)",
  60: "hsl(128deg 5% 60%)",
  65: "hsl(128deg 5% 65%)",
  70: "hsl(128deg 5% 70%)",
  75: "hsl(128deg 5% 75%)",
  80: "hsl(128deg 5% 85%)",
  85: "hsl(128deg 5% 90%)",
  90: "hsl(128deg 5% 91.5%)",
  95: "hsl(128deg 5% 93%)",
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