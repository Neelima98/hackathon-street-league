import { useState } from "react";
import DesktopNavContainer from "./Desktop/NavbarContainer.jsx";
import MobileNavContainer from "./Mobile/NavbarContainer.jsx";

export default function NavManager({ isExpanded, setIsExpanded }) {
  const [activeRoute, setActiveRoute] = useState("Home");
  return (
    <>
      <div className="hidden md:block fixed top-0 left-0 h-screen bg-[#262E3C]">
        <DesktopNavContainer
          activeRoute={activeRoute}
          setActiveRoute={setActiveRoute}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      </div>
      <div className="md:hidden w-full z-99 fixed bottom-0 h-[73px] bg-[#262E3C] rounded-sm">
        <MobileNavContainer
          activeRoute={activeRoute}
          setActiveRoute={setActiveRoute}
        />
      </div>
    </>
  );
}
