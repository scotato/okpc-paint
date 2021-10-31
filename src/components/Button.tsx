import { useState, useEffect, forwardRef, ButtonHTMLAttributes } from "react";
import { colors } from "../theme";

const style = {
  button: {
    margin: 0,
    border: 0,
    padding: "12px 16px",
    fontSize: 20,
    lineHeight: 1,
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

const flipCoin = () => Math.round(Math.random());
const randomRadius = () => (flipCoin() ? "16px" : "0px");

const randomStyles = () => {
  return {
    ...style.button,
    borderRadius: `${randomRadius()} ${randomRadius()} ${randomRadius()} ${randomRadius()}`,
    backgroundColor: randomItem(backgroundColors),
  };
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  seed?: number;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ seed, ...props }, ref) => {
    const [buttonStyle, setButtonStyle] = useState(randomStyles());
    const randomize = () => setButtonStyle(randomStyles());
    const onMouseEnter = () => randomize();
    const onMouseLeave = () => randomize();

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
