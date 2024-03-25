import { burgersReducer, userReducer } from '@slices';

export const rootReducer = {
  burgers: burgersReducer,
  user: userReducer
};
