import { useState, useEffect } from "react";
import ReactDomServer from "react-dom/server";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "./Button";
import { ScreenState, useStore } from "../hooks/useScreen";

export const ExportButton = () => {
  const [copied, setCopied] = useState(false);
  const [text, setText] = useState("");

  const onMouseEnter = () => {
    setText(ReactDomServer.renderToStaticMarkup(<Screen />));
  };

  useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <CopyToClipboard
      text={text}
      onCopy={(a, b) => {
        console.log({ a, b });
        setCopied(true);
      }}
    >
      <Button onMouseEnter={onMouseEnter}>{copied ? "copied!" : "copy"}</Button>
    </CopyToClipboard>
  );
};

const selector = (state: ScreenState) => ({width: state.width, height: state.height, pixelsMatrix: state.pixels});

const Screen = () => {
  const { width, height, pixelsMatrix } = useStore(selector);
  const pixels = pixelsMatrix.reduce((acc, row) => [...acc, ...row], []);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
      <rect fill="#cccccc" width={width} height={height} />
      {pixels
        .filter((pixel) => pixel.on)
        .map((pixel, i) => {
          return (
            <rect
              key={i}
              width={1}
              height={1}
              x={pixel.x}
              y={pixel.y}
              fill="#4d4d4d"
            />
          );
        })}
    </svg>
  );
};
