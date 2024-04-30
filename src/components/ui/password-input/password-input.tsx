import { TICons } from '@zlden/react-developer-burger-ui-components/dist/ui/icons';
// import { Input } from '@zlden/react-developer-burger-ui-components';
import { FC, useState } from 'react';
import { TPasswordInputProps } from './type';
import { Input } from '@ui';

export const PasswordInput: FC<TPasswordInputProps> = ({
  password,
  error,
  errorText,
  placeholder,
  name,
  onBlur,
  onFocus,
  onChange,
  extraClass
}) => {
  const [visible, setVisible] = useState(false);
  const [currentIcon, setCurrentIcon] = useState<keyof TICons>('ShowIcon');
  const onIconClick = () => {
    if (currentIcon === 'ShowIcon') {
      setVisible(true);
      setCurrentIcon('HideIcon');
    } else {
      setCurrentIcon('ShowIcon');
      setVisible(false);
    }
  };

  return (
    <Input
      type={visible ? 'text' : 'password'}
      placeholder={placeholder ? placeholder : 'Пароль'}
      onChange={onChange}
      value={password}
      name={name ? name : 'password'}
      error={error}
      errorText={errorText}
      size='default'
      icon={currentIcon}
      onIconClick={onIconClick}
      onBlur={onBlur}
      onFocus={onFocus}
      extraClass={extraClass}
    />
  );
};
