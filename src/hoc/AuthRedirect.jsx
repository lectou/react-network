import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AuthRedirect(Component) {
  const RedirectComponent = () => {

    const isAuth = useSelector(({ auth }) => auth.isAuth);

    if (!isAuth) return <Redirect to='/login' />

    return (
      <Component />
    )
  }

  return RedirectComponent;
}
