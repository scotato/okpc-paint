import { colors } from "../theme";
import { Link } from "react-router-dom";

const style = {
  app: {
    display: "grid",
    margin: "0 auto",
    padding: 32,
    gap: 32,
    maxWidth: 1800,
    minHeight: "100%",
    gridTemplateRows: "auto 1fr auto",
  },
  header: {},
  footer: {
    display: "flex",
    justifyContent: "center",
    gap: 32,
    textTransform: "uppercase" as "uppercase",
  },
  title: {
    margin: 0,
    textAlign: "center" as "center",
    lineHeight: 1,
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
            exquisite graphics
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
