import { Navigate, Outlet } from 'react-router-dom';
import { Preloader } from '../../ui/preloader';
import { TProtectedRouteUIProps } from './type';

export const ProtectedRouteUI = ({
  onlyUnAuth,
  isAuthChecked,
  user,
  location
}: TProtectedRouteUIProps) => {
  if (!isAuthChecked) return <Preloader />;

  if (!onlyUnAuth && !user)
    return <Navigate replace to='/login' state={{ from: location }} />;

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return <Outlet />;
};
