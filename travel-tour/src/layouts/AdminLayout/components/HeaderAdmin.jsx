import React, { memo, useState } from "react";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import logo from "~/assets/logo/no-avatar.png";
import logoTour from "~/assets/logo/logo-tour.png";

export const HeaderAdmin = memo(() => {
  const [isScroll, setIsScroll] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  // const { profileResponse } = useSelector((store) => store.user);
  // const { getAllNotificationsResponse } = useSelector(
  //   (store) => store.notification,
  // );

  // const cartState = localStorage.getItem(
  //   STORAGE_KEY.CART_STATE.concat('_').concat(profileResponse.data.id),
  // )
  //   ? JSON.parse(
  //     localStorage.getItem(
  //       STORAGE_KEY.CART_STATE.concat('_').concat(profileResponse.data.id),
  //     ),
  //   )
  //   : [];

  window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > 80) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  });

  return (
    <section id="header-admin">
      <div className="header-admin--inner">
        <div className="header-admin--inner--right">
          <img src={logo} />
        </div>
      </div>
    </section>
  );
});

HeaderAdmin.displayName = "HeaderAdmin";
