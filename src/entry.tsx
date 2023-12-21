import { createHashRouter, RouterProvider } from "react-router-dom";
import Index from "./routes/_index";

import AuthLayoutRoutes, {
  routesId as authLayoutRoutesId,
  loader as authLayoutLoader,
} from "./routes/_auth";
import AuthLoginRoutes, {
  routesId as authLoginRoutesId,
  loader as authLoginLoader,
} from "./routes/_auth.signin";
import AuthSignupRoutes, {
  routesId as authSignupRoutesId,
  loader as authSignupLoader,
} from "./routes/_auth.signup";

const router = createHashRouter([
  {
    id: "root",
    path: "/",
    Component: Index,
  },
  {
    id: authLayoutRoutesId,
    path: "auth",
    loader: authLayoutLoader,
    Component: AuthLayoutRoutes,
    children: [
      {
        id: authLoginRoutesId,
        path: "signin",
        loader: authLoginLoader,
        Component: AuthLoginRoutes,
      },
      {
        id: authSignupRoutesId,
        path: "signup",
        loader: authSignupLoader,
        Component: AuthSignupRoutes,
      },
    ],
  },
]);

export default function Entry() {
  return <RouterProvider router={router} />;
}
