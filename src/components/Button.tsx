import { useState, useEffect, forwardRef, ButtonHTMLAttributes } from "react";
import styled, { useTheme } from "styled-components";
import { useInterval } from "../hooks/useInterval";

const randomItem = (items: string[]) =>
  items[Math.floor(Math.random() * items.length)];

const randomColor = (
  colors: { [key: string]: string },
  color: string
): string => {
  const colorsFiltered = Object.values(colors).filter(
    (c) => c !== colors["common"]
  );
  const newColor = randomItem(colorsFiltered);
  if (color !== newColor) return newColor;
  return randomColor(colors, color);
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { colors, grayscale } = useTheme();
    const [hovered, setHovered] = useState(false);
    const [color, setColor] = useState("");
    const { count } = useInterval(250);
    const onMouseEnter = () => setHovered(true);
    const onMouseLeave = () => setHovered(false);
    const backgroundColor = hovered ? color : grayscale[75];

    useEffect(() => {
      if (hovered) setColor(randomColor(colors, color));
      // eslint-disable-next-line
    }, [count, hovered]);

    return (
      <ButtonStyled
        style={{ backgroundColor, color: grayscale[15] }}
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        hovered={hovered}
        {...props}
      />
    );
  }
);

const ButtonStyled = styled.button<{ hovered: boolean }>`
  margin: 0;
  border: 0;
  padding: 12px 16px;
  font-size: 20px;
  line-height: 1;
  height: 48px;
  font-family: inherit;
  cursor: pointer;
  will-change: background-color, border-radius;
  transition: 250ms ease-in-out background-color,
    250ms ease-in-out border-radius;
  font-weight: 600;
  text-transform: uppercase;
  border-top-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;
