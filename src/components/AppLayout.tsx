import { grayscale } from "../theme";
import { Link } from "react-router-dom";

import { useWindow } from "../hooks/useWindow";
import { Logo } from "./Logo";
import { ASPECTRATIO } from "./Screen";
import { MintButton } from "./MintButton";
import { ConnectWalletButton } from "./ConnectWalletButton";

interface StyleProps {
  width: number;
  height: number;
  isLandscape: boolean;
}

const getStyle = ({ width, height, isLandscape }: StyleProps) => ({
  app: {
    display: "grid",
    margin: "0 auto",
    padding: 32,
    maxWidth: 1800,
    height: "100vh",
    placeContent: "center",
  },
  container: {
    overflow: "hidden",
    borderRadius: 32,
    minWidth: isLandscape ? (height - 64 - 82) * ASPECTRATIO : width - 64,
    maxWidth: isLandscape ? (height - 64 - 82) * ASPECTRATIO : "100%",
    minHeight: isLandscape ? height - 64 : width - 64,
    maxHeight: height - 64,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: isLandscape ? ("row" as "row") : ("column" as "column"),
    userSelect: "none" as "none",
    backgroundColor: grayscale[15],
    padding: 16,
    fontWeight: 600,
    gap: 32,
  },
  links: {
    display: "flex",
    justifyContent: "center",
    gap: 32,
  },
  title: {
    display: "flex",
    margin: 0,
    justifyContent: "center" as "center",
    textAlign: "center" as "center",
    lineHeight: 1.2,
  },
  logo: {
    height: 48,
  },
  link: {
    margin: 0,
    fontSize: 16,
    color: grayscale[30],
    textDecoration: "none",
  },
});

function AppLayout({ children }: { children: JSX.Element }) {
  const { width, height, isLandscape } = useWindow();
  const style = getStyle({ width, height, isLandscape });

  return (
    <div style={style.app} className="app-layout">
      <div style={style.container}>
        {children}
        <footer style={style.footer}>
          <Link to="/" style={style.link}>
            <Logo style={style.logo} />
          </Link>
          <div style={style.links}>
            <a
              href="https://github.com/scotato/exquisite-graphics"
              style={style.link}
            >
              github
            </a>
            <a href="https://twitter.com/scotato" style={style.link}>
              twitter
            </a>
            <a href="https://tiny-83.github.io/tiny-83/" style={style.link}>
              tiny-83
            </a>
          </div>
          <ConnectWalletButton />
          <MintButton />
        </footer>
      </div>
    </div>
  );
}

export default AppLayout;
