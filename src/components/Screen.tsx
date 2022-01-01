import React, { useCallback } from "react";
import styled from "styled-components";
import { useScreen } from "../hooks/useScreen";

interface PixelGridProps {
  width: number;
  height: number;
  pixelsMatrix: Pixel[][];

  onPixelClick: (pixel: Pixel) => void;
  onMouseEnter: (pixel: Pixel) => void;
  onMouseDown: (pixel: Pixel) => void;
}


const PixelGrid = React.memo(function PixelGrid ({width, height, pixelsMatrix, onPixelClick, onMouseDown, onMouseEnter}: PixelGridProps) {
  const pixels = pixelsMatrix.reduce((acc, row) => [...acc, ...row], []);
  return (<SVG viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
  <Background width={width} height={height} />
  {pixels.map((pixel, i) => {
    return (
      <Pixel
        key={i}
        width={1.1}
        height={1.1}
        x={pixel.x}
        y={pixel.y}
        onClick={() => onPixelClick(pixel)}
        onMouseEnter={() => onMouseEnter(pixel)}
        onMouseDown={() => onMouseDown(pixel)}
        isOn={pixel.on}
      />
    );
  })}
</SVG>)
});

const noop = () => {};

export const Screen = () => {
  const {
    togglePixel,
    setLastPixelDown,
    onPixelEnter,
    height,
    width,
    pixels
  } = useScreen();
  const onMouseEnter = useCallback((pixel: Pixel) => onPixelEnter(pixel), [onPixelEnter]);
  const onPixelClick = useCallback((pixel: Pixel) => togglePixel(pixel), [togglePixel]);

return <PixelGrid height={height} width={width} pixelsMatrix={pixels} onMouseDown={setLastPixelDown} onMouseEnter={onMouseEnter} onPixelClick={onPixelClick} />
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
