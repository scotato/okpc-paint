import { useState } from "react";
import { useWallet } from "@gimmixorg/use-wallet";
import { colors } from "../theme";
import { useScreen } from "../hooks/useScreen";
import { useMint, TxStatus } from "../hooks/useMint";

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
  const { account } = useWallet();
  const { send, state, encode256 } = useMint();
  const { screencode } = useScreen();
  const [buttonStyle, setButtonStyle] = useState(randomStyles());
  const randomize = () => setButtonStyle(randomStyles());
  const onMouseEnter = () => randomize();
  const onMouseLeave = () => randomize();
  const onClick = () => {
    randomize();
    const leftPart = encode256(screencode.leftCode);
    const rightPart = encode256(screencode.rightCode);
    console.log(screencode.leftCode, leftPart);
    console.log(screencode.rightCode, rightPart);
    send(leftPart, rightPart);
  };

  state && console.log(state);

  return (
    <button
      style={buttonStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      disabled={!account || getButtonState(state?.status)}
    >
      {getButtonText(state?.status)}
    </button>
  );
};

function getButtonText(status?: TxStatus) {
  switch (status) {
    case TxStatus.PENDING:
      return "minting";
    case TxStatus.COMPLETED:
      return "minted";
    case TxStatus.FAILED:
      return "failed";
    default:
      return "mint";
  }
}

function getButtonState(status?: TxStatus) {
  switch (status) {
    case TxStatus.PENDING:
    case TxStatus.COMPLETED:
    case TxStatus.FAILED:
      return true;
    default:
      return false;
  }
}
