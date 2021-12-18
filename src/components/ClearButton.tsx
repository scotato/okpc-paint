import { Button } from "./Button";
import { useScreen } from "../hooks/useScreen";

export const ClearButton = () => {
  const { clearPixels } = useScreen();

  const clearWithConfirm = () => {
    const confirmed = window.confirm("Are you sure?");
    if (confirmed) clearPixels();
  };

  return <Button onClick={clearWithConfirm}>Clear</Button>;
};
