import { grayscale } from "../theme";
import { useScreen } from "../hooks/useScreen";

const WIDTH = 22;
const HEIGHT = 14;

const styleCell = {
  cursor: "pointer",
  willChange: "fill",
  transition: "100ms ease-in-out fill",
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

export const Screen = () => {
  const { pixels, togglePixel, setHovered } = useScreen();
  const onMouseEnter = (pixel: Pixel) => () => setHovered(pixel, true);
  const onMouseLeave = (pixel: Pixel) => () => setHovered(pixel, false);
  const onPixelClick = (pixel: Pixel) => () => togglePixel(pixel);

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} xmlns="http://www.w3.org/2000/svg">
      <rect width={WIDTH} height={HEIGHT} style={style.screen} />
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
            style={pixelStyle}
          />
        );
      })}
      <rect
        width="3"
        height="3"
        x={WIDTH - 3}
        y={HEIGHT - 3}
        style={style.screen}
      />
      <rect
        width="1"
        height="1"
        x={WIDTH - 2}
        y={HEIGHT - 2}
        style={style.on}
      />
    </svg>
  );
};
