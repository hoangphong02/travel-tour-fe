import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {Route } from 'react-router-dom';
import { getProfileRequest } from '~/redux/user/actions';
export const AuthLayout = (props) => {
  
  const dispatch = useDispatch();
  const checkAuth = () => {
    dispatch(getProfileRequest());
  };
  useEffect(() => {
    // if (!isGetProfileSuccess) {
      checkAuth();
    // }
  }, []);
  const render = () => {
    return (
      <div className="auth-layout">
        <Route {...props} />
      </div>
    );
  };

  return render();
};


