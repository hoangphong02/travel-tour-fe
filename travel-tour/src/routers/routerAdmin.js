import { v4 as uuidv4 } from 'uuid';
import { routesAdmin } from '~/configs';
import { AdminBlog, AdminBooking, AdminDashboard, AdminFood, AdminStaff, AdminTour } from '~/pages/Admin';


export const routerAdmin = [
  {
    id: `user-${uuidv4()}`,
    path: routesAdmin.admin,
    component: AdminDashboard,
  },
  {
    id: `user-${uuidv4()}`,
    path: routesAdmin.adminBlog,
    component: AdminBlog,
  },
  {
    id: `user-${uuidv4()}`,
    path: routesAdmin.adminStaff,
    component: AdminStaff,
  },
  {
    id: `user-${uuidv4()}`,
    path: routesAdmin.adminBooking,
    component: AdminBooking,
  },
  {
    id: `user-${uuidv4()}`,
    path: routesAdmin.adminFood,
    component: AdminFood,
  },
  {
    id: `user-${uuidv4()}`,
    path: routesAdmin.adminTour,
    component: AdminTour,
  },
];
