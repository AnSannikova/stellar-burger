import { authCheckedSelector, getUserDataSelector } from '@slices';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(authCheckedSelector);
  const location = useLocation();
  // const user = useSelector(getUserDataSelector);

  // if (!isAuthChecked) return <Preloader />;

  if (!isAuthChecked && !onlyUnAuth) return <Navigate replace to='/login' />;

  if (isAuthChecked && onlyUnAuth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
