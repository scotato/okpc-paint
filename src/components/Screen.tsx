import styled from "styled-components";
import { useScreen } from "../hooks/useScreen";

export const Screen = () => {
  const {
    width,
    height,
    pixels,
    togglePixel,
    onPixelDown,
    onPixelEnter,
    onPixelLeave,
  } = useScreen();
  const onMouseDown = (pixel: Pixel) => () => onPixelDown(pixel);
  const onMouseEnter = (pixel: Pixel) => () => onPixelEnter(pixel);
  const onMouseLeave = (pixel: Pixel) => () => onPixelLeave(pixel);
  const onPixelClick = (pixel: Pixel) => () => togglePixel(pixel);

  return (
    <SVG viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
      <Background width={width} height={height} />
      {pixels.map((pixel, i) => {
        return (
          <Pixel
            key={i}
            width={1.1}
            height={1.1}
            x={pixel.x}
            y={pixel.y}
            onClick={onPixelClick(pixel)}
            onMouseEnter={onMouseEnter(pixel)}
            onMouseLeave={onMouseLeave(pixel)}
            onMouseDown={onMouseDown(pixel)}
            isOn={pixel.on}
          />
        );
      })}
      {/* <rect
        SCREENwidth="3"
        SCREENheight="3"
        x={width - 3}
        y={height - 3}
        style={style.background}
      />
      <rect
        SCREENwidth="1"
        SCREENheight="1"
        x={width - 2}
        y={height - 2}
        style={style.on}
      /> */}
    </SVG>
  );
};

const SVG = styled.svg`
  display: block;
  margin: 0 auto;
`;

const Background = styled.rect`
  fill: ${(props) => props.theme.grayscale[15]};
`;

const Pixel = styled.rect<{ isOn: boolean }>`
  cursor: pointer;
  will-change: fill;
  transition: 100ms ease-in-out fill;
  fill: ${(props) => props.theme.grayscale[props.isOn ? 25 : 75]};

  &:hover {
    fill: ${(props) => props.theme.grayscale[props.isOn ? 35 : 65]};
  }
`;
