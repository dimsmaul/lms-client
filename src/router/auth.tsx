import Loaders from "@/components/loading/loaders";
import UserLayouts from "@/layouts/users";
import React, { Suspense } from "react";
import { type RouteObject } from "react-router-dom";

const DashboardPages = React.lazy(() => import("../features/home/pages/index"));

const CoursePages = React.lazy(() => import("../features/courses/pages/index"));
const DetailCoursesPages = React.lazy(
  () => import("../features/courses/pages/details")
);

const CourseModuleItems = React.lazy(
  () => import("../features/courses/features/items/pages/index")
);

export const route_auth: RouteObject[] = [
  {
    path: "/",
    element: <UserLayouts />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <DashboardPages />
          </Suspense>
        ),
      },
      {
        path: "/courses",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <CoursePages />
          </Suspense>
        ),
      },
      {
        path: "/my-courses",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <CoursePages isMyCourses />
          </Suspense>
        ),
      },
      {
        path: "/courses",
        // element: <Outlet />,
        children: [
          {
            path: "/courses/:id",
            element: (
              <Suspense fallback={<Loaders isFullScreen />}>
                <DetailCoursesPages />
              </Suspense>
            ),
          },
          {
            path: "/courses/:id/edit",
            element: (
              <Suspense fallback={<Loaders isFullScreen />}>
                <DetailCoursesPages isTrainer />
              </Suspense>
            ),
          },
          {
            path: "/courses/items/:id",
            element: (
              <Suspense fallback={<Loaders isFullScreen />}>
                <CourseModuleItems />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
];
