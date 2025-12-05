import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layout/RootLayouts";
import Home from "../page/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
    ]
  },
]);
