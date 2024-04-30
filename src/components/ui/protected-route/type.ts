import { TUser } from '@utils-types';
import { Location } from 'react-router-dom';

export type TProtectedRouteUIProps = {
  onlyUnAuth?: boolean;
  isAuthChecked: boolean;
  user: TUser | null;
  location: Location<any>;
};
