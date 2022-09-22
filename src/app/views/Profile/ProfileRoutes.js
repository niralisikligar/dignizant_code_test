import Loadable from "app/components/Loadable";
import { lazy } from "react";

const Profile = Loadable(lazy(() => import("./Profile")));


const profileRoutes = [
  {
    path: "/profileupdate",
    element: <Profile />,
  }
 
];

export default profileRoutes;
