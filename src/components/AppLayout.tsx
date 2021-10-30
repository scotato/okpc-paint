import { colors } from "../theme";
import { Link } from "react-router-dom";

const style = {
  app: {
    display: "grid",
    margin: "0 auto",
    padding: 64,
    maxWidth: 1800,
    minHeight: "100%",
    gridTemplateRows: "1fr auto",
  },
  header: {},
  footer: {
    display: "flex",
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    justifyContent: "space-between",
  },
  title: {
    textAlign: "center" as "center",
  },
  titleLink: {
    fontSize: 32,
    color: colors.white,
    textDecoration: "none",
    textTransform: "uppercase" as "uppercase",
  },
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
        <Legend />
        <Resources />
      </footer>
    </div>
  );
}

function Resources() {
  const style = {
    resources: {},
    link: {
      color: colors.white,
      textDecoration: "none",
    },
  };

  return (
    <span style={style.resources}>
      <Link to="/help" style={style.link}>
        Help
      </Link>
    </span>
  );
}

function Legend() {
  const style = {
    legend: {
      display: "grid",
      gridAutoFlow: "column",
      justifyContent: "flex-start",
      gridColumnGap: 12,
      gridRowGap: 12,
    },
  };

  return <span style={style.legend} className="legend"></span>;
}

export default AppLayout;
