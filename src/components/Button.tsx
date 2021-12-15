import { forwardRef, ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { rainbow } from "../theme";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <ButtonStyled ref={ref} {...props} />;
  }
);

const ButtonStyled = styled.button`
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
  background-color: ${(props) => props.theme.grayscale[75]};
  color: ${(props) => props.theme.grayscale[15]};

  &:hover {
    animation: ${rainbow("background-color")} 2s linear infinite;
  }
`;
