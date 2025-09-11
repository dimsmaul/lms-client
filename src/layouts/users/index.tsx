import DashboardNavbar from "@/components/dashboard-navbar/components";
import React from "react";
import { Outlet } from "react-router-dom";

const UserLayouts: React.FC = () => {
  return (
    <div>
      <DashboardNavbar />
      <div className="px-8 py-5">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayouts;
