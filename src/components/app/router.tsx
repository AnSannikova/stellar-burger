import { createBrowserRouter } from 'react-router-dom';
import { ConstructorPage, NotFound404 } from '@pages';
import { ProtectedRoute } from '@components';
import { MainLayout } from '../../layouts';
import path, { basename } from 'path';

export const router = createBrowserRouter(
  [
    {
      element: <MainLayout />,
      errorElement: <NotFound404 />,
      children: [
        {
          path: '/',
          Component: ConstructorPage,
          children: [
            {
              path: 'ingredients/:id',
              lazy: async () => {
                const { Modal, IngredientDetails } = await import(
                  '@components'
                );
                return {
                  element: (
                    <Modal title='Детали ингредиента'>
                      <IngredientDetails />
                    </Modal>
                  )
                };
              }
            }
          ]
        },
        {
          path: '/feed',
          lazy: async () => {
            const { Feed } = await import('@pages');
            return { Component: Feed };
          },
          children: [
            {
              path: ':number',
              lazy: async () => {
                const { Modal, OrderInfo } = await import('@components');
                return {
                  element: (
                    <Modal title='Детали заказа'>
                      <OrderInfo />
                    </Modal>
                  )
                };
              }
            }
          ]
        },
        {
          element: <ProtectedRoute onlyUnAuth />,
          children: [
            {
              path: '/login',
              lazy: async () => {
                const { Login } = await import('@pages');
                return { Component: Login };
              }
            },
            {
              path: '/register',
              lazy: async () => {
                const { Register } = await import('@pages');
                return { Component: Register };
              }
            },
            {
              path: '/forgot-password',
              lazy: async () => {
                const { ForgotPassword } = await import('@pages');
                return { Component: ForgotPassword };
              }
            },
            {
              path: '/reset-password',
              lazy: async () => {
                const { ResetPassword } = await import('@pages');
                return { Component: ResetPassword };
              }
            }
          ]
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: '/profile',
              children: [
                {
                  index: true,
                  lazy: async () => {
                    const { Profile } = await import('@pages');
                    return { Component: Profile };
                  }
                },
                {
                  path: 'orders',
                  lazy: async () => {
                    const { ProfileOrders } = await import('@pages');
                    return { Component: ProfileOrders };
                  },
                  children: [
                    {
                      path: ':number',
                      lazy: async () => {
                        const { Modal, OrderInfo } = await import(
                          '@components'
                        );
                        return {
                          element: (
                            <Modal
                              title='Детали заказа'
                              onClosePath='/profile/orders'
                            >
                              <OrderInfo />
                            </Modal>
                          )
                        };
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  { basename: process.env.PUBLIC_PATH ? process.env.PUBLIC_PATH : '/' }
);
