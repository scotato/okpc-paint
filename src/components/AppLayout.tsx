import { colors } from "../theme";
import { Link } from "react-router-dom";

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
    justifyContent: "center",
    textTransform: "uppercase" as "uppercase",
    gap: 32,
    userSelect: "none" as "none",
  },
  title: {
    margin: 0,
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
      </footer>
    </div>
  );
}

export default AppLayout;
