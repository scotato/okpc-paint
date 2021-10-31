import { colors } from "../theme";
import { Link } from "react-router-dom";

import { MintButton } from "./MintButton";
import { ConnectWalletButton } from "./ConnectWalletButton";

const style = {
  app: {
    display: "flex",
    margin: "0 auto",
    padding: 32,
    gap: 32,
    maxWidth: 1800,
    height: "100vh",
    flexDirection: "column" as "column",
  },
  header: {
    userSelect: "none" as "none",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none" as "none",
    gap: 32,
  },
  links: {
    display: "flex",
    justifyContent: "center",
    textTransform: "uppercase" as "uppercase",
    gap: 32,
  },
  title: {
    display: "flex",
    margin: 0,
    justifyContent: "center" as "center",
    textAlign: "center" as "center",
    lineHeight: 1.2,
  },
  titleLink: {
    margin: 0,
    display: "block",
    fontSize: 32,
    color: colors.white,
    textDecoration: "none",
    textTransform: "uppercase" as "uppercase",
  },
  link: {
    margin: 0,
    color: "white",
    textDecoration: "none",
  },
};

const styleGithub = {
  ...style.link,
  color: colors.common,
};

const styleTwitter = {
  ...style.link,
  color: colors.rare,
};

const styleTiny = {
  ...style.link,
  color: colors.uncommon,
};

function AppLayout({ children }: { children: JSX.Element }) {
  return (
    <div style={style.app} className="app-layout">
      <header style={style.header}>
        <h1 style={style.title}>
          <Link to="/" style={style.titleLink}>
            exquisite
            <br />
            graphics
          </Link>
        </h1>
      </header>
      {children}
      <footer style={style.footer}>
        <Links />
        <ConnectWalletButton />
        <MintButton />
      </footer>
    </div>
  );
}

const Links = () => {
  return (
    <div style={style.links}>
      <a
        href="https://github.com/scotato/exquisite-graphics"
        style={styleGithub}
      >
        github
      </a>
      <a href="https://twitter.com/scotato" style={styleTwitter}>
        twitter
      </a>
      <a href="https://tiny-83.github.io/tiny-83/" style={styleTiny}>
        tiny-83
      </a>
    </div>
  );
};

export default AppLayout;
