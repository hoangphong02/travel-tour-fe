import React, { memo, useState } from "react";
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
} from "cdbreact";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { routesAdmin, routesUser } from "~/configs";
import logoTour from "~/assets/logo/logo-tour.png";

export const SideBar = memo(() => {
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <CDBSidebar textColor="#333" backgroundColor="#f0f0f0" className="sidebar">
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        <div
          className="container"
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => history.push(routesUser.home)}
        >
          <img
            src={logoTour}
            alt=""
            style={{ height: "40px", width: "auto" }}
          />
        </div>
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBSidebarMenuItem
            icon="th-large"
            style={{
              backgroundColor:
                pathname === routesAdmin.admin ? "#08428c" : "transparent",
              color: pathname === routesAdmin.admin ? "#fff" : "#000",
            }}
            onClick={() => history.push(routesAdmin.admin)}
          >
            Dashboard
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            icon="sticky-note"
            onClick={() => history.push(routesAdmin.adminCategoryTour)}
            style={{
              backgroundColor:
                pathname === routesAdmin.adminCategoryTour
                  ? "#08428c"
                  : "transparent",
              color:
                pathname === routesAdmin.adminCategoryTour ? "#fff" : "#000",
            }}
          >
            Danh mục tour
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            icon="sticky-note"
            onClick={() => history.push(routesAdmin.adminTour)}
            style={{
              backgroundColor:
                pathname === routesAdmin.adminTour ? "#08428c" : "transparent",
              color: pathname === routesAdmin.adminTour ? "#fff" : "#000",
            }}
          >
            Tour
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            icon="chart-line"
            iconType="solid"
            onClick={() => history.push(routesAdmin.adminCategoryBlog)}
            style={{
              backgroundColor:
                pathname === routesAdmin.adminCategoryBlog
                  ? "#08428c"
                  : "transparent",
              color:
                pathname === routesAdmin.adminCategoryBlog ? "#fff" : "#000",
            }}
          >
            Danh mục blog
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            icon="chart-line"
            iconType="solid"
            onClick={() => history.push(routesAdmin.adminBlog)}
            style={{
              backgroundColor:
                pathname === routesAdmin.adminBlog ? "#08428c" : "transparent",
              color: pathname === routesAdmin.adminBlog ? "#fff" : "#000",
            }}
          >
            Blog
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            icon="chart-line"
            iconType="solid"
            onClick={() => history.push(routesAdmin.adminStaff)}
            style={{
              backgroundColor:
                pathname === routesAdmin.adminStaff ? "#08428c" : "transparent",
              color: pathname === routesAdmin.adminStaff ? "#fff" : "#000",
            }}
          >
            Nhân viên
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            icon="chart-line"
            iconType="solid"
            onClick={() => history.push(routesAdmin.adminBooking)}
            style={{
              backgroundColor:
                pathname === routesAdmin.adminBooking
                  ? "#08428c"
                  : "transparent",
              color: pathname === routesAdmin.adminBooking ? "#fff" : "#000",
            }}
          >
            Book tour
          </CDBSidebarMenuItem>
        </CDBSidebarMenu>
      </CDBSidebarContent>
    </CDBSidebar>
  );
});
