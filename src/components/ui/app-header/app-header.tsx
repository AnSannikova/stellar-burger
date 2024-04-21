import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.link_active}` : styles.link
          }
          to={'/'}
        >
          <BurgerIcon type={'primary'} />
          <p className={`text ml-2 mr-10 ${styles.text_type_link}`}>
            Конструктор
          </p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.link_active}` : styles.link
          }
          to={'/feed'}
        >
          <ListIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </NavLink>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.link_active}` : styles.link
          }
          to={userName ? '/profile' : '/login'}
        >
          <ProfileIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </NavLink>
      </div>
    </nav>
  </header>
);
