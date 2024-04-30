import { FC } from 'react';

import styles from './constructor-page.module.css';

import { ConstructorPageUIProps } from './type';
import { Preloader } from '@ui';
import { BurgerIngredients, BurgerConstructor } from '@components';
import { Outlet } from 'react-router-dom';

export const ConstructorPageUI: FC<ConstructorPageUIProps> = ({
  isIngredientsLoading
}) => (
  <>
    {isIngredientsLoading ? (
      <Preloader />
    ) : (
      <>
        <h1 className={`${styles.title} text_type_main`}>Соберите бургер</h1>
        <div className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
        <Outlet />
      </>
    )}
  </>
);
