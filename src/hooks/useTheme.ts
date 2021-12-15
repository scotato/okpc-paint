import create from "zustand";
import { Hue, hues, grayscales } from "../theme";

type ThemeState = {
  color: Hue;
};

const randomHue = () => {
  const items = Object.keys(hues) as Hue[];
  return items[Math.floor(Math.random() * items.length)];
};

const useStore = create((set) => {
  return {
    color: randomHue(),
    setColor: (color: Hue) => set((state: ThemeState) => ({ color })),
    randomColor: () => set((state: ThemeState) => ({ color: randomHue() })),
  };
});

export const useTheme = () => {
  const store = useStore();
  // const grayscale = grayscales[store.color]
  const grayscale = grayscales["common"];

  return { ...store, grayscale };
};
