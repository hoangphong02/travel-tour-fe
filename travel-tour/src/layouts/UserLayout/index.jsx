import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useLocation } from "react-router-dom";
import { FooterAction, HeaderAction } from "~/components/common";
import { routesUser } from "~/configs";
import { getProfileRequest } from "~/redux/user/actions";

// import { getProfileRequest } from '~/redux/user/actions';
// import { useDispatch, useSelector } from 'react-redux';
// import { LoadingPage } from '~/pages/Other';

export const UserLayout = (props) => {
  const { isGetProfileSuccess, profileResponse, isGetProfileFailure } =
    useSelector((store) => store.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = () => {
    dispatch(getProfileRequest());
  };

  useEffect(() => {
    if (!isGetProfileSuccess) {
      checkAuth();
    }
  }, []);

  // useEffect(() => {
  //   if (isGetProfileSuccess) {
  //     if (profileResponse?.data) {
  //       const isLogin = localStorage.getItem('is_login');
  //       const accessToken = localStorage.getItem('accessToken');
  //       if (isLogin && accessToken) {
  //         setIsAuth(true);
  //       }
  //     }
  //     setIsLoading(false);
  //   } else if (isGetProfileFailure) {
  //     setIsLoading(false);
  //   }
  // }, [isGetProfileSuccess, isGetProfileFailure]);

  // useEffect(() => {
  //   if (isAuth && isLoading) {
  //   }
  // }, [isAuth]);

  const render = () => {
    // if (isLoading) return <LoadingPage />;
    return (
      <div
        className={`user-layout${pathname.includes(routesUser.ordersList.concat("/")) || pathname.includes(routesUser.cart) || pathname.includes(routesUser.historyPoint) || pathname.includes(routesUser.profile) || pathname.includes(routesUser.information) || pathname.includes(routesUser.addressesManager) || pathname.includes(routesUser.productType.replace(":productTypeId", "")) || pathname.includes(routesUser.vouchersList.concat("/")) || pathname.includes(routesUser.history.concat("/")) || pathname.includes(routesUser.giftsList.concat("/")) ? " hide-footer-action" : ""}`}
      >
        {pathname.includes(routesUser.admin) ||
        pathname.includes(
          routesUser.productType.replace(":productTypeId", "")
        ) ? (
          ""
        ) : (
          <HeaderAction />
        )}
        <Route {...props} />
        {pathname.includes(routesUser.admin) ||
        pathname.includes(
          routesUser.productType.replace(":productTypeId", "")
        ) ? (
          ""
        ) : (
          <FooterAction />
        )}
      </div>
    );
  };

  return render();
};
