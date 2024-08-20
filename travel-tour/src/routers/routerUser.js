import { v4 as uuidv4 } from 'uuid';

import { routesUser } from '../configs';
import { UserHomePage } from '../pages/User';


export const routerUser = [
  {
    id: `user-${uuidv4()}`,
    path: routesUser.home,
    component: UserHomePage,
  },
];
