import { FC } from 'react';

import styles from './constructor-page.module.css';

import { ConstructorPageUIProps } from './type';
import { Preloader } from '@ui';
import { BurgerIngredients, BurgerConstructor } from '@components';
import { Outlet } from 'react-router-dom';

export const ConstructorPageUI: FC<ConstructorPageUIProps> = ({
  isIngredientsLoading,
  screenSize
}) => {
  if (isIngredientsLoading) {
    return <Preloader />;
  } else if (screenSize < 1250) {
    return (
      <>
        <h1
          className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
        >
          Соберите бургер
        </h1>
        <div className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients />
          {/* <BurgerConstructor /> */}
        </div>
        <Outlet />
      </>
    );
  } else {
    return (
      <>
        <h1
          className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
        >
          Соберите бургер
        </h1>
        <div className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
        <Outlet />
      </>
    );
  }
};
