import { FC, ReactNode } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: ReactNode;
}

const Portal: FC<PortalProps> = ({ children }) => {
  const portalRoot = document.getElementById("portal-root") as HTMLElement;

  return ReactDOM.createPortal(children, portalRoot);
};

export default Portal;
