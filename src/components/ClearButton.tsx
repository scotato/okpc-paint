import { Button } from "./Button";
import { ScreenState, useStore } from "../hooks/useScreen";

const selector = (state: ScreenState) => state.clearPixels;

export const ClearButton = () => {
  const clearPixels = useStore(selector);

  const clearWithConfirm = () => {
    const confirmed = window.confirm("Are you sure?");
    if (confirmed) clearPixels();
  };

  return <Button onClick={clearWithConfirm}>Clear</Button>;
};
