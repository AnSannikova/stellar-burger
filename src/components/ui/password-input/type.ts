import { ChangeEvent, Dispatch, FocusEvent, SetStateAction } from 'react';

export type TPasswordInputProps = {
  password: string;
  error: boolean;
  errorText: string;
  placeholder?: string;
  name?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
