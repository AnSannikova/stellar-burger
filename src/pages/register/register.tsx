import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  isErrorSelector,
  isLoadingSelector,
  registerUser,
  resetErrorMessage
} from '@slices';
import { Preloader } from '@ui';
import { useForm } from '../../hooks/useForm';
import { useValidate } from '../../hooks/useValidate';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const isError = useSelector(isErrorSelector);
  const isLoading = useSelector(isLoadingSelector);

  const [formData, handleInputChange, handleSubmit] = useForm({
    name: '',
    email: '',
    password: '',
    repPassword: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    repPassword: false
  });
  // const [errors, validate] = useValidate({
  //   name: false,
  //   email: false,
  //   password: false,
  //   repPassword: false
  // });

  useEffect(() => {
    dispatch(resetErrorMessage());
  }, [dispatch]);

  const onSubmit = (e: SyntheticEvent) => {
    handleSubmit(e);
    // dispatch(
    //   registerUser({
    //     name: formData.name,
    //     email: formData.email,
    //     password: formData.password
    //   })
    // );
  };

  if (isLoading) return <Preloader />;

  return (
    <RegisterUI
      errorText={isError ? 'Пользователь с таким адресом уже существует' : ''}
      email={formData.email}
      userName={formData.name}
      password={formData.password}
      repPassword={formData.repPassword}
      errors={errors}
      handleInputChange={handleInputChange}
      handleSubmit={onSubmit}
    />
  );
};
