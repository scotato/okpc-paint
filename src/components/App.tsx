import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../components/GlobalStyle";
import AppLayout from "../components/AppLayout";
import ScrollToTop from "../components/ScrollToTop";
import HomePage from "../pages/HomePage";
import HelpPage from "../pages/HelpPage";
import { useTheme } from "../hooks/useTheme";
import { useWindow } from "../hooks/useWindow";
import { ScreenState, useStore } from "../hooks/useScreen";
import theme from "../theme";

const selector = (state: ScreenState) => ({width: state.width, height: state.height, aspectRatio: state.aspectRatio});

function App() {
  const { grayscale } = useTheme();
  const { width, height, aspectRatio } = useStore(selector);
  const window = useWindow();
  const screen = { width, height, aspectRatio };

  return (
    <Router>
      <ThemeProvider theme={{ ...theme, grayscale, window, screen }}>
        <AppLayout>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/help">
              <HelpPage />
            </Route>
          </Switch>
        </AppLayout>
        <ScrollToTop />
        <GlobalStyle />
      </ThemeProvider>
    </Router>
  );
}

export default App;
