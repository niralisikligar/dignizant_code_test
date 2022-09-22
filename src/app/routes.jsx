
import dashboardRoutes from "app/views/dashboard/DashboardRoutes";

import serviceRoutes from "app/views/Service/ServiceRoutes";
import profileRoutes from "app/views/Profile/ProfileRoutes"
import NotFound from "app/views/sessions/NotFound";
import sessionRoutes from "app/views/sessions/SessionRoutes";
import { Navigate } from "react-router-dom";
import MatxLayout from "./components/MatxLayout/MatxLayout";

const routes = [
  {
    element: (
      
      <MatxLayout />
    
    ),
    children: [
      ...dashboardRoutes,
    ...profileRoutes,
      ...serviceRoutes,

    ],
  },
  ...sessionRoutes,
  { path: "/", element: <Navigate to="service" /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
