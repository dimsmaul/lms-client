import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "./app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  // BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import ThemeToggleButton from "@/features/theme/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { UserHeaderCard } from "@/components/dashboard-navbar/components";

const AdministratorLayouts: React.FC = () => {
  const location = useLocation();

  const currentPath = location.pathname;

  const createBreadcrumbs = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    return segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      return (
        <BreadcrumbItem key={href}>
          <BreadcrumbLink href={href}>
            {segment.charAt(0).toUpperCase() + segment.slice(1)}
          </BreadcrumbLink>
          {index < segments.length - 1 && <BreadcrumbSeparator />}
        </BreadcrumbItem>
      );
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex px-4 justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>{createBreadcrumbs(currentPath)}</BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <ThemeToggleButton />
            <Button variant={"outline"} size={"icon"}>
              <Bell />
            </Button>
            <UserHeaderCard />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdministratorLayouts;
