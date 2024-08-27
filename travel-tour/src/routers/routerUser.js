import { v4 as uuidv4 } from 'uuid';
import { routesUser } from '~/configs';
import { UserHomePage, IntroducePage, PriceTourPage , ContactPage, BookingPage} from '~/pages/User';

export const routerUser = [
  {
    id: `user-${uuidv4()}`,
    path: routesUser.home,
    component: UserHomePage,
  },
  {
    id: `user-${uuidv4()}`,
    path: routesUser.introduce,
    component: IntroducePage,
  },
    {
    id: `user-${uuidv4()}`,
    path: routesUser.tablePriceTour,
    component: PriceTourPage,
  },
     {
    id: `user-${uuidv4()}`,
    path: routesUser.contact,
    component: ContactPage,
  },
     {
    id: `user-${uuidv4()}`,
    path: routesUser.booking,
    component: BookingPage,
  },
];
