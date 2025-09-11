import React from "react";
import type { RouteObject } from "react-router-dom";

const SignInPages = React.lazy(() => import("../features/auth/pages/sign-in"));
const SignUpPages = React.lazy(() => import("../features/auth/pages/sign-up"));

export const route_unauth: RouteObject[] = [
  {
    path: "/sign-in",
    element: <SignInPages />,
  },
  {
    path: "/sign-up",
    element: <SignUpPages />,
  },
];
