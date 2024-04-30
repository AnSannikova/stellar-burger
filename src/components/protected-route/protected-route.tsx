import { authCheckedSelector, getUserDataSelector } from '@slices';
import { useSelector } from '../../services/store';
import { useLocation } from 'react-router-dom';
import { ProtectedRouteUI } from '@ui';
import { TProtectedRouteProps } from './type';

export const ProtectedRoute = ({ onlyUnAuth }: TProtectedRouteProps) => {
  const isAuthChecked = useSelector(authCheckedSelector);
  const user = useSelector(getUserDataSelector);
  const location = useLocation();

  return (
    <ProtectedRouteUI
      onlyUnAuth={onlyUnAuth}
      isAuthChecked={isAuthChecked}
      user={user}
      location={location}
    />
  );
};
