import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { OrderInfo } from '../order-info';
import { Modal } from '../modal';
import { IngredientDetails } from '../ingredient-details';

export const Router = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path='*' element={<NotFound404 />} />

        <Route path='/' element={<ConstructorPage />} />

        <Route path='/feed'>
          <Route index element={<Feed />} />
          <Route path=':number' element={<OrderInfo />} />
        </Route>

        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />

        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path='orders'>
            <Route
              index
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path=':number'
              element={
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>

        <Route path='/ingredients/:id' element={<IngredientDetails />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            // element={
            //   <Modal title='Заголовок' onClose={() => console.log('close')}>
            //     <OrderInfo />
            //   </Modal>
            // }
          />
          <Route
            path='/ingredients/:id'
            // element={
            //   <Modal title='Заголовок' onClose={() => console.log('close')}>
            //     <IngredientDetails />
            //   </Modal>
            // }
          />
          <Route
            path='/profile/orders/:number'
            // element={
            //   <Modal title='Заголовок' onClose={() => console.log('close')}>
            //     <OrderInfo />
            //   </Modal>
            // }
          />
        </Routes>
      )}
    </>
  );
};
