import React from 'react'
import {Route } from 'react-router-dom';
export const AuthLayout = (props) => {
  
  const render = () => {
    return (
      <div className="auth-layout">
        <Route {...props} />
      </div>
    );
  };

  return render();
};


