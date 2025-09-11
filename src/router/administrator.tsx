import Loaders from "@/components/loading/loaders";
import AdministratorLayouts from "@/layouts/administrator";
import React, { Suspense } from "react";
import type { RouteObject } from "react-router-dom";

const DashboardPages = React.lazy(
  () => import("../features/admin/dashboard/pages/index")
);

const UsersPages = React.lazy(
  () => import("../features/admin/users/pages/list")
);

const ActionUserPages = React.lazy(
  () => import("../features/admin/users/pages/action")
);

const CoursesPages = React.lazy(
  () => import("../features/admin/courses/pages/list")
);

const CoursesApprovalPages = React.lazy(
  () => import("../features/admin/courses-approval/pages/index")
);

export const router_administrator: RouteObject[] = [
  {
    path: "/admin",
    element: <AdministratorLayouts />,
    children: [
      {
        path: "/admin",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <DashboardPages />
          </Suspense>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <UsersPages />
          </Suspense>
        ),
      },
       {
        path: "/admin/users/create",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <ActionUserPages />
          </Suspense>
        ),
      },
      {
        path: "/admin/users/update/:id",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <ActionUserPages is_update />
          </Suspense>
        ),
      },
      {
        path: "/admin/courses",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <CoursesPages />
          </Suspense>
        ),
      },
      {
        path: "/admin/courses-approval",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <CoursesApprovalPages />
          </Suspense>
        ),
      },
    ],
  },
];
