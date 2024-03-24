import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  moveDownConstructorItem,
  moveUpConstructorItem,
  removeConstructorItem
} from '../../services/slices/burgersSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveDownConstructorItem({ ...ingredient, index }));
    };

    const handleMoveUp = () => {
      dispatch(moveUpConstructorItem({ ...ingredient, index }));
    };

    const handleClose = () => {
      dispatch(removeConstructorItem(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
