import { FC } from 'react';
import { InfoUIProps } from './type';
import {
  Button,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from './info.module.css';

export const InfoUI: FC<InfoUIProps> = ({ price, onClick }) => (
  <div className={`${styles.total} mt-10 mr-4`}>
    <div className={`${styles.cost} mr-10`}>
      <p className={`text ${styles.text} mr-2`}>{price}</p>
      <CurrencyIcon type='primary' />
    </div>
    <Button
      htmlType='button'
      type='primary'
      size='large'
      children='Посмотреть заказ'
      onClick={onClick}
    />
  </div>
);
