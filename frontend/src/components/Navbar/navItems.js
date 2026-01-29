import HomeIcon from "../../assets/NavIcons/HomeIcon.jsx";
import ProgressIcon from "../../assets/NavIcons/ProgressIcon.jsx";
import CalendarIcon from "../../assets/NavIcons/CalendarIcon.jsx";

export const navItems = [
  { name: "Home", translationKey: "home", route: "/", Icon: HomeIcon },
  {
    name: "Data",
    translationKey: "progress",
    route: "/data-dashboard",
    Icon: ProgressIcon,
  },
  {
    name: "Calendar",
    translationKey: "calendar",
    route: "/calendar",
    Icon: CalendarIcon,
  },
];
