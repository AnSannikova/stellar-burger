import { ChangeEvent, SyntheticEvent, useState } from 'react';

export const useForm = (initialState: { [key: string]: string }) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return [formData, handleInputChange, handleSubmit] as const;
};
