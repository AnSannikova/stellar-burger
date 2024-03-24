import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import { getConstructorItemsSelector } from '../../services/slices/burgersSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(getConstructorItemsSelector);

  const orderRequest = false;

  const orderModalData = null;

  // const onOrderClick = () => {
  // if (!user) {
  //   navigate('/login');
  //   return;
  // }

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      ('price' in constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
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
