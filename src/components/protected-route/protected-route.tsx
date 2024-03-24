// import { useSelector } from '../services/store';
// import {
//   isAuthCheckedSelector,
//   userDataSelector
// } from '../services/store/selectors';
// import { Navigate, useLocation } from 'react-router';

type ProtectedRouteProps = {
  // onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => children;

// {
//   // const isAuthChecked = useSelector(isAuthCheckedSelector);
//   // const user = useSelector(userDataSelector);
//   // const location = useLocation();

//   // if (!isAuthChecked) {
//   //   return <Preloader />;
//   // }

//   // if (!onlyUnAuth && !user) {
//   //   return <Navigate replace to='/login' state={{ from: location }} />;
//   // }

//   // if (onlyUnAuth && user) {
//   //   const from = location.state?.from || { pathname: '/' };
//   //   return <Navigate replace to={from} />;
//   // }

//   return children;
// };
