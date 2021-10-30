import { grayscale } from "../theme";

const style = {
  screen: {
    fill: grayscale[10],
  },
  pixel: {
    fill: grayscale[90],
  },
};

export const Screen = () => {
  return (
    <svg viewBox="0 0 22 14" xmlns="http://www.w3.org/2000/svg">
      <rect width="22" height="14" style={style.screen} />
      <rect width="1" height="1" x="20" y="11" style={style.pixel} />
      <rect width="1" height="1" x="19" y="12" style={style.pixel} />
    </svg>
  );
};
