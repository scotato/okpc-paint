import { useState } from "react";
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

export const MintButton = () => {
  const [buttonStyle, setButtonStyle] = useState(randomStyles());
  const randomize = () => setButtonStyle(randomStyles());
  const onMouseEnter = () => randomize();
  const onMouseLeave = () => randomize();
  const onClick = () => {
    randomize();
    alert("🥵 this feature isn't ready yet...");
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      mint
    </button>
  );
};