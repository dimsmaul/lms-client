import React, { useEffect } from "react";
import {
  Navigate,
  useRoutes,
  // Navigate
} from "react-router-dom";
import { route_auth } from "./auth";
import { route_unauth } from "./unauth";
import { useAuthStore } from "@/hooks/useAuthStore";
import { router_administrator } from "./administrator";

const Routes: React.FC = () => {
  const { user, loading, checkAuth, refetchSessionAt } = useAuthStore();

  // useEffect(() => {
  //   if (!user) {
  //     checkAuth();
  //   }
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (refetchSessionAt && Date.now() > refetchSessionAt) {
        checkAuth();
      }
    }, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, [refetchSessionAt, checkAuth]);

  if (loading) return <div>Loading...</div>;

  const routes = user
    ? [
        ...route_auth,
        ...(user.isSuperAdmin ? router_administrator : []),
      ]
    : route_unauth;

  return useRoutes([
    ...routes,
    {
      path: "*",
      element: <Navigate to={user ? "/dashboard" : "/sign-in"} replace />,
    },
  ]);
};

export default Routes;
