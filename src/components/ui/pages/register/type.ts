import { ChangeEvent } from 'react';
import { PageUIProps } from '../common-type';

type TErrors = {
  [key: string]: boolean;
};

export type RegisterUIProps = PageUIProps & {
  password: string;
  userName: string;
  repPassword: string;
  errors: TErrors;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
