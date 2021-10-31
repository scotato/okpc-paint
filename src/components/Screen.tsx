import { grayscale } from "../theme";
import { useScreen } from "../hooks/useScreen";

export const SCREENWIDTH = 22;
export const SCREENHEIGHT = 14;
export const ASPECTRATIO = SCREENWIDTH / SCREENHEIGHT;

const styleCell = {
  cursor: "pointer",
  willChange: "fill",
  transition: "100ms ease-in-out fill",
};

const style = {
  screen: {
    display: "block",
    margin: "0 auto",
  },
  background: {
    fill: grayscale[15],
  },
  on: {
    ...styleCell,
    fill: grayscale[25],
  },
  off: {
    ...styleCell,
    fill: grayscale[75],
  },
  hover: {
    ...styleCell,
    fill: grayscale[50],
  },
};

export const Screen = () => {
  const { pixels, togglePixel, onPixelDown, onPixelEnter, onPixelLeave } =
    useScreen();
  const onMouseDown = (pixel: Pixel) => () => onPixelDown(pixel);
  const onMouseEnter = (pixel: Pixel) => () => onPixelEnter(pixel);
  const onMouseLeave = (pixel: Pixel) => () => onPixelLeave(pixel);
  const onPixelClick = (pixel: Pixel) => () => togglePixel(pixel);

  return (
    <svg
      viewBox={`0 0 ${SCREENWIDTH} ${SCREENHEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
      style={style.screen}
    >
      <rect
        width={SCREENWIDTH}
        height={SCREENHEIGHT}
        style={style.background}
      />
      {pixels.map((pixel, i) => {
        const pixelStyle = pixel.on
          ? style.on
          : pixel.hovered
          ? style.hover
          : style.off;

        return (
          <rect
            key={i}
            width={1.01}
            height={1.01}
            x={pixel.x}
            y={pixel.y}
            onClick={onPixelClick(pixel)}
            onMouseEnter={onMouseEnter(pixel)}
            onMouseLeave={onMouseLeave(pixel)}
            onMouseDown={onMouseDown(pixel)}
            style={pixelStyle}
          />
        );
      })}
      {/* <rect
        SCREENwidth="3"
        SCREENheight="3"
        x={SCREENWIDTH - 3}
        y={SCREENHEIGHT - 3}
        style={style.background}
      />
      <rect
        SCREENwidth="1"
        SCREENheight="1"
        x={SCREENWIDTH - 2}
        y={SCREENHEIGHT - 2}
        style={style.on}
      /> */}
    </svg>
  );
};
