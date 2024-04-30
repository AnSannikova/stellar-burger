import { FC, useCallback } from 'react';
import { TTabProps } from './type';
import clsx from 'clsx';
import styles from './tab.module.css';

export const Tab: FC<TTabProps> = ({ active, value, children, onClick }) => {
  const className = clsx(styles.tab, {
    [styles.tab_type_current]: active
  });

  const handleClick = useCallback(() => {
    if (typeof onClick === 'function') {
      onClick(value);
    }
  }, [onClick, value]);

  return (
    <div className={className} onClick={handleClick}>
      <span className='text text_type_main-default'>{children}</span>
    </div>
  );
};
