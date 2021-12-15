import { ReactComponent as SVG } from "../images/okpc-logo.svg";

interface LogoProps extends React.SVGProps<SVGSVGElement> {}

export const Logo = (props: LogoProps) => <SVG {...props} />;
