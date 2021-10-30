import { useState } from "react";
import { grayscale } from "../theme";

const WIDTH = 22;
const HEIGHT = 14;

const styleCell = {
  cursor: "pointer",
  willChange: "fill",
  transition: "200ms ease-in-out fill",
};

const style = {
  screen: {
    fill: grayscale[10],
  },
  on: {
    ...styleCell,
    fill: grayscale[90],
  },
  off: {
    ...styleCell,
    fill: grayscale[10],
  },
  hover: {
    ...styleCell,
    fill: grayscale[50],
  },
};

type PixelCoords = [number, number];
const SEPARATOR = ",";

export const Screen = () => {
  const [pixels, setPixels] = useState<PixelCoords[]>([]);
  const [hovered, setHovered] = useState<PixelCoords | undefined>(undefined);
  const [hoverX, hoverY] = hovered || [];
  const pixelsFlat = pixels.map((coords) => coords.join(SEPARATOR));
  const onMouseEnter = (px: PixelCoords) => () => setHovered(px);
  const onMouseLeave = () => setHovered(undefined);
  const onPixelClick = (px: PixelCoords) => () => togglePixel(px);

  const togglePixel = ([x, y]: PixelCoords) => {
    const pixelFlat = [x, y].join(SEPARATOR);
    const pixelIsOn = pixelsFlat.includes(pixelFlat);
    const removePixel = (pixel: string) => pixel !== pixelFlat;
    const expandPixel = (pixel: string) =>
      pixel.split(SEPARATOR).map((pixel) => Number(pixel)) as PixelCoords;
    setPixels(
      pixelIsOn
        ? pixelsFlat.filter(removePixel).map(expandPixel)
        : [...pixels, [x, y]]
    );
  };

  const isPixelActive = ([x, y]: PixelCoords) => {
    const pixelFlat = [x, y].join(SEPARATOR);
    return pixelsFlat.includes(pixelFlat);
  };

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} xmlns="http://www.w3.org/2000/svg">
      <rect width={WIDTH} height={HEIGHT} style={style.screen} />
      {Array.from({ length: HEIGHT }, (v, y) =>
        Array.from({ length: WIDTH }, (v, x) => {
          const isHovered = x === hoverX && y === hoverY;
          const isActive = isPixelActive([x, y]);
          const pixelStyle = isActive
            ? style.on
            : isHovered
            ? style.hover
            : style.off;

          return (
            <rect
              width={1.01}
              height={1.01}
              x={x}
              y={y}
              onClick={onPixelClick([x, y])}
              onMouseEnter={onMouseEnter([x, y])}
              onMouseLeave={onMouseLeave}
              style={pixelStyle}
            />
          );
        })
      )}
      <rect
        width="4"
        height="4"
        x={WIDTH - 4}
        y={HEIGHT - 4}
        style={style.screen}
      />
      <rect
        width="1"
        height="1"
        x={WIDTH - 2}
        y={HEIGHT - 3}
        style={style.on}
      />
      <rect
        width="1"
        height="1"
        x={WIDTH - 3}
        y={HEIGHT - 2}
        style={style.on}
      />
    </svg>
  );
};
