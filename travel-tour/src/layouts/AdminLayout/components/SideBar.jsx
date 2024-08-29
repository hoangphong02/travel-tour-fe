import React, { memo } from 'react';
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,

} from 'cdbreact';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { routesAdmin } from '~/configs';
import logoTour from '~/assets/logo/logo-tour.png';


export const SideBar = memo(() => { 
    const history= useHistory();
  return (
      <CDBSidebar textColor="#333" backgroundColor="#f0f0f0" className='sidebar'>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />} >
          <div className="container" style={{ display: 'flex', alignItems: 'center', }}>
            <img
              src={logoTour}
              alt=""
              style={{ height: '40px', width:'auto' }}
            />
          </div>
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <CDBSidebarMenuItem icon="th-large" onClick={()=> history.push(routesAdmin.admin)}>Dashboard</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note"  onClick={()=> history.push(routesAdmin.adminTour)}>Tour</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="chart-line" iconType="solid"  onClick={()=> history.push(routesAdmin.adminFood)}>
              Food
            </CDBSidebarMenuItem>
             <CDBSidebarMenuItem icon="chart-line" iconType="solid" onClick={()=> history.push(routesAdmin.adminBlog)}>
              Blog
            </CDBSidebarMenuItem>
               <CDBSidebarMenuItem icon="chart-line" iconType="solid" onClick={()=> history.push(routesAdmin.adminStaff)}>
              Staff
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="chart-line" iconType="solid" onClick={()=> history.push(routesAdmin.adminBooking)}>
              Booking
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
  )
});
