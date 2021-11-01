import styled from "styled-components";
import { Link } from "react-router-dom";

import { Logo } from "./Logo";
import { MintButton } from "./MintButton";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { rainbow } from "../theme";

function AppLayout({ children }: { children: JSX.Element }) {
  return (
    <AppContainer>
      <AppBody>
        {children}
        <AppFooter>
          <AppLink to="/">
            <AppLogo />
          </AppLink>
          <AppLinks>
            {/* <AppLink to="/help">help</AppLink> */}
            <AppLinkExternal href="https://github.com/scotato/exquisite-graphics">
              github
            </AppLinkExternal>
            <AppLinkExternal href="https://twitter.com/scotato">
              twitter
            </AppLinkExternal>
            <AppLinkExternal href="https://tiny-83.github.io/tiny-83/">
              tiny-83
            </AppLinkExternal>
          </AppLinks>
          <ConnectWalletButton />
          <MintButton />
        </AppFooter>
      </AppBody>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: grid;
  margin: 0 auto;
  padding: 32px;
  max-width: 1600px;
  height: 100vh;
  place-content: center;
`;

const AppBody = styled.div`
  overflow: hidden;
  border-radius: 24px;
  min-width: ${({ theme }) =>
    theme.window.isLandscape
      ? (theme.window.height - 64 - 82) * theme.screen.aspectRatio
      : theme.window.width - 64}px;
  max-width: ${({ theme }) =>
    theme.window.isLandscape
      ? (theme.window.height - 64 - 82) * theme.screen.aspectRatio
      : theme.window.width}px;
  min-height: ${({ theme }) =>
    theme.window.isLandscape
      ? theme.window.height - 64
      : theme.window.width - 64}px;
  max-height: ${({ theme }) => theme.window.height - 64}px;
`;

const AppFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${(props) =>
    props.theme.window.isLandscape ? "row" : "column"};
  background-color: ${(props) => props.theme.grayscale[20]};
  padding: 16px;
  font-weight: 600;
  gap: 32px;
`;

const AppLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
`;

const AppLogo = styled(Logo)`
  height: 48px;
`;

const AppLink = styled(Link)`
  margin: 0;
  fontsize: 20px;
  color: ${(props) => props.theme.grayscale[50]};
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    animation: ${rainbow("color")} 2s linear infinite;
  }
`;

const AppLinkExternal = styled.a`
  margin: 0;
  font-size: 20px;
  color: ${(props) => props.theme.grayscale[50]};
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    animation: ${rainbow("color")} 2s linear infinite;
  }
`;

export default AppLayout;
