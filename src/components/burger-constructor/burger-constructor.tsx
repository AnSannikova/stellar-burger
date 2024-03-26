import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructorItemsSelector,
  getOrderResponseSelector,
  orderBurger,
  resetConstructorItems,
  resetOrderResponse
} from '@slices';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(getConstructorItemsSelector);
  const orderResponse = useSelector(getOrderResponseSelector);
  const orderRequest = orderResponse.success;
  const orderModalData = orderResponse.order;

  // const onOrderClick = () => {
  // if (!user) {
  //   navigate('/login');
  //   return;
  // }

  const onOrderClick = () => {
    dispatch(orderBurger(constructorItems));
    dispatch(resetConstructorItems());
  };

  const closeOrderModal = () => {
    dispatch(resetOrderResponse());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems.ingredients.length > 0
        ? constructorItems.ingredients?.reduce(
            (accum, currentValue) => accum + currentValue.price,
            0
          )
        : 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
