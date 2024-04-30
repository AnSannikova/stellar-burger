import { ReactNode } from 'react';

export type TTabProps = {
  active: boolean;
  value: string;
  children: ReactNode;
  onClick: (value: string) => void;
};
