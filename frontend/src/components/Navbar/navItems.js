import HomeIcon from "../../assets/NavIcons/HomeIcon.jsx";
import ProgressIcon from "../../assets/NavIcons/ProgressIcon.jsx";
import UserIcon from "../../assets/NavIcons/UserIcon.jsx";
import SettingsIcon from "../../assets/NavIcons/SettingsIcon.jsx";
import LessonIcon from "../../assets/NavIcons/LessonIcon.jsx";
import CalendarIcon from "../../assets/NavIcons/CalendarIcon.jsx";

export const navItems = [
  { name: "Home", translationKey: "home", route: "/", Icon: HomeIcon },
  { name: "Lessons", translationKey: "lessons", route: "/lessons", Icon: LessonIcon },
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
