import { useWallet } from "@gimmixorg/use-wallet";
import { useScreen } from "../hooks/useScreen";
import { useMint, TxStatus } from "../hooks/useMint";

import { Button } from "./Button";

export const MintButton = () => {
  const { account } = useWallet();
  const { send, state, encode256 } = useMint();
  const { screencode } = useScreen();
  const onClick = () => {
    if (!screencode) {
      return;
    }
    const leftPart = encode256(screencode.leftCode);
    const rightPart = encode256(screencode.rightCode);
    console.log(screencode.leftCode, leftPart);
    console.log(screencode.rightCode, rightPart);
    send(leftPart, rightPart);
  };

  state && console.log(state);

  return account ? (
    <Button onClick={onClick} disabled={getButtonState(state?.status)}>
      {getButtonText(state?.status)}
    </Button>
  ) : null;
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
