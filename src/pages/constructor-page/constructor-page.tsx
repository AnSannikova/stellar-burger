import { useSelector } from '../../services/store';
import { FC } from 'react';
import { getLoadingIngredientsSelector } from '@slices';
import { ConstructorPageUI } from '@ui-pages';
import { useResize } from '../../hooks/useResize';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useSelector(getLoadingIngredientsSelector);
  const screenWidth = useResize();

  return (
    <ConstructorPageUI
      isIngredientsLoading={isIngredientsLoading}
      screenSize={screenWidth}
    />
  );
};
