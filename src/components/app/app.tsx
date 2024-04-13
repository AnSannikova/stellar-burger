import '../../index.css';

import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { checkUserAuth, getBurgerIngredients } from '@slices';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBurgerIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
