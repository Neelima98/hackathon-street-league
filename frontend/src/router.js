import { createBrowserRouter } from "react-router";
import Home from "./routes/Home.jsx";
import Post from "./routes/Post.jsx";
import DataDashboard from "./routes/DataDashboard.jsx";
import SplitScreen from "./components/SplitScreen/SplitScreen.jsx";
import Error from "./routes/Error.jsx";
import Series from "./routes/Series.jsx";
import Lessons from "./routes/Lessons.jsx";
import Calendar from "./routes/Calendar.jsx";

export default createBrowserRouter([
  {
    Component: SplitScreen,
    errorElement: Error,
    children: [
      { index: true, Component: Home },
      { path: "lessons", Component: Lessons },
      { path: "data-dashboard", Component: DataDashboard },
      { path: "post/:id", Component: Post },
      { path: "series/:id", Component: Series },
      { path: "*", Component: Error },
      { path: "calendar", Component: Calendar },
      { path: "post/:id", Component: Post },
      { path: "series/:id", Component: Series },
      { path: "*", Component: Error },
    ],
  },
]);
