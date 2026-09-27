import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import DashboardSidebar from "./Sidebar";
import DashboardHeader from "./Header";

export default function DashboardLayout() {
  const location = useLocation();

  const getPageInfo = () => {
    const path = location.pathname;

    if (path === "/dashboard") {
      return {
        title: "Dashboard",
        subtitle:
          "Overview of your clothing manufacturing business",
      };
    }

    if (path === "/dashboard/applications") {
      return {
        title: "Job Applications",
        subtitle:
          "Manage and review candidate applications",
      };
    }

    if (path === "/dashboard/jobs") {
      return {
        title: "Jobs",
        subtitle:
          "Create and manage available career opportunities",
      };
    }

    if (path === "/dashboard/jobs/add") {
      return {
        title: "Add Job",
        subtitle:
          "Create a new career opportunity",
      };
    }

    if (path.startsWith("/dashboard/jobs/edit/")) {
      return {
        title: "Edit Job",
        subtitle:
          "Update career opportunity details",
      };
    }

    if (path === "/dashboard/products") {
      return {
        title: "Products",
        subtitle:
          "Manage your clothing products",
      };
    }

    if (path === "/dashboard/products/add") {
      return {
        title: "Add Product",
        subtitle:
          "Create a new product",
      };
    }

    if (path === "/dashboard/orders") {
      return {
        title: "Orders",
        subtitle:
          "Manage customer orders",
      };
    }

    if (path === "/dashboard/customers") {
      return {
        title: "Customers",
        subtitle:
          "Manage your customers",
      };
    }

    if (path === "/dashboard/users") {
      return {
        title: "Registered Users",
        subtitle:
          "Manage registered users",
      };
    }

    if (path === "/dashboard/analytics") {
      return {
        title: "Analytics",
        subtitle:
          "Business performance and analytics",
      };
    }

    return {
      title: "Dashboard",
      subtitle:
        "Overview of your clothing manufacturing business",
    };
  };

  const pageInfo = getPageInfo();

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#F4F7FB",
        overflowX: "hidden",
      }}
    >
      {/* SIDEBAR */}
      <DashboardSidebar />

      {/* MAIN CONTENT */}
      <div
        style={{
          marginLeft: "270px",
          minHeight: "100vh",
          width: "calc(100% - 270px)",
        }}
      >
        {/* HEADER */}
        <DashboardHeader
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
        />

        {/* PAGE CONTENT */}
        <main
          style={{
            width: "100%",
            minHeight: "calc(100vh - 80px)",
            padding: "24px",
            boxSizing: "border-box",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}