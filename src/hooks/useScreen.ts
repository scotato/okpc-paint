import create from "zustand";
import { persist } from "zustand/middleware";
import { useEffect } from "react";
import { BigNumber } from "ethers";

export const SCREENWIDTH = 24;
export const SCREENHEIGHT = 16;


export type ScreenState = {
  width: number;
  height: number;
  aspectRatio: number;
  pixels: Pixel[][];
  isMouseDown: boolean;
  isErasing: boolean;
  lastPixelDown?: Pixel;
  updatePixel: (pixel: Pixel, update: Pixel) => void;
  setLastPixelDown: (pixel: Pixel) => void;
  togglePixel: (pixel: Pixel) => void;
  setMouseDown: (isMouseDown: boolean) => void;
  clearPixels: () => void;
};

export const useStore = create<ScreenState>(
  persist(
    (set) => {
      const width = SCREENWIDTH;
      const height = SCREENHEIGHT;
      const aspectRatio = width / height;
      const pixels = Array.from({ length: height }, (v, y) => {
        return Array.from({ length: width }, (v, x) => {
          return { x, y, on: false } as Pixel;
        });
      });

      const updatePixel = (pixel: Pixel, update: Pixel) =>
        set((state: ScreenState) => ({
          pixels: state.pixels.map((v, y) => {
            return state.pixels[y].map((v, x) => {
              const px = state.pixels[y][x];
              const isY = y === pixel.y;
              const isX = x === pixel.x;
              if (isY && isX) return update;
              return px;
            });
          }),
        }));

      return {
        width,
        height,
        aspectRatio,
        pixels,
        updatePixel,
        isErasing: false,
        isMouseDown: false,
        setLastPixelDown: (pixel: Pixel) =>
          set((state) => ({ lastPixelDown: pixel })),
        togglePixel: (pixel: Pixel) =>
          updatePixel(pixel, { ...pixel, on: !pixel.on }),
        setMouseDown: (isMouseDown: boolean) =>
          set((state) => ({ isMouseDown })),
        clearPixels: () => {
          set((state: ScreenState) => ({ pixels }));
        },
      };
    },
    {
      name: "okpc-screen",
      partialize: ({ pixels }) => ({ pixels }),
    }
  )
);

export const useScreen = (shouldReturnCode: boolean = false) => {
  const store = useStore((state) => {
    const onPixelEnter = (pixel: Pixel) => {
      state.isMouseDown
        && state.updatePixel(pixel, {
            ...pixel,
            on: !state.lastPixelDown?.on,
          })
    };
    let screencode = undefined;
    if (shouldReturnCode) {
      screencode = gridToPairOfUint160(state.pixels);
    }
    return {
      ...state,
      screencode,
      pixels: state.pixels,
      onPixelEnter,
    };
  });

  useEffect(() => {
    const onMouseDown = () => store.setMouseDown(true);
    const onMouseUp = () => store.setMouseDown(false);

    document.body.addEventListener("mousedown", onMouseDown);
    document.body.addEventListener("mouseup", onMouseUp);

    return () => {
      document.body.removeEventListener("mousedown", onMouseDown);
      document.body.removeEventListener("mouseup", onMouseUp);
    };
  }, [store]);

  return store;
};

function gridToPairOfUint160(pixels: Pixel[][]) {
  let gridR = pixels.map((val, index) =>
    [pixels].map((row) => row[index]).reverse()
  );
  let grid2R = gridR[0].map((val, index) =>
    gridR.map((row) => row[index]).reverse()
  )[0];
  let leftPart = BigNumber.from(0n);
  let rightPart = BigNumber.from(0n);
  for (let i = 0; i < 14; i++) {
    for (let j = 0; j < 22; j++) {
      const power = BigNumber.from(13 - i).add(BigNumber.from(j % 11).mul(14n));
      const diff = grid2R[i][j].on ? BigNumber.from(2n).pow(power) : 0n;
      if (j < 11) {
        leftPart = leftPart.add(diff);
      } else {
        rightPart = rightPart.add(diff);
      }
    }
  }

  return {
    leftCode: leftPart.toString(),
    rightCode: rightPart.toString(),
  };
}
