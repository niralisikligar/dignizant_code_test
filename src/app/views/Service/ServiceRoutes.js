import Loadable from "app/components/Loadable";
import { lazy } from "react";

const ServiceTable = Loadable(lazy(() => import("./ServiceTable")));
const AddService = Loadable(lazy(() => import("./ServiceForm")));

const serviceRoutes = [
  {
    path: "/service",
    element: <ServiceTable />,
  },
  {
    path: "/service/:id",
    element: <AddService />,
  },
];

export default serviceRoutes;
