import { useState, useEffect, forwardRef, ButtonHTMLAttributes } from "react";
import { useInterval } from "../hooks/useInterval";
import { colors } from "../theme";

const style = {
  button: {
    margin: 0,
    border: 0,
    padding: "12px 16px",
    fontSize: 20,
    lineHeight: 1,
    height: 48,
    fontFamily: "inherit",
    cursor: "pointer",
    willChange: "background-color, border-radius",
    transition:
      "100ms ease-in-out background-color, 100ms ease-in-out border-radius",
    fontWeight: 600,
  },
};

const randomItem = (items: string[]) =>
  items[Math.floor(Math.random() * items.length)];
const backgroundColors = [
  colors.uncommon,
  colors.rare,
  colors.epic,
  colors.legendary,
  colors.mythic,
];

const randomStyles = () => {
  return {
    ...style.button,
    borderBottomRightRadius: 16,
    backgroundColor: randomItem(backgroundColors),
  };
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  seed?: number;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ seed, ...props }, ref) => {
    const [buttonStyle, setButtonStyle] = useState(randomStyles());
    const [hovered, setHovered] = useState(false);
    const { count } = useInterval(200);
    const randomize = () => setButtonStyle(randomStyles());
    const onMouseEnter = () => {
      setHovered(true);
      randomize();
    };
    const onMouseLeave = () => {
      setHovered(false);
      randomize();
    };

    useEffect(() => {
      if (hovered) randomize();
    }, [hovered, count]);

    useEffect(randomize, [seed]);

    return (
      <button
        style={buttonStyle}
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
      />
    );
  }
);
