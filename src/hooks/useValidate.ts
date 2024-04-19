import { useState } from 'react';
import {
  emailPattern,
  namePattern,
  passwordPattern
} from '../utils/validationPatterns';

// export const useValidate = () => {
//   const [error, setError] = useState(false);

//   const validate = (event: ChangeEvent<HTMLInputElement>) => {
//     const input = event.target;

//     let pattern: RegExp;
//     switch (input.name) {
//       case 'email':
//         pattern = emailPattern;
//         break;
//       case 'password':
//         pattern = passwordPattern;
//         break;
//       case 'name':
//         pattern = namePattern;
//         break;
//       default:
//         pattern = /.+/;
//     }

//     setError(!pattern.test(input.value));
//   };

//   return [error, validate] as const;
// };

type TFormData = {
  [key: string]: string;
};

export const useValidate = (initialState: { [key: string]: boolean }) => {
  const [errors, setErrors] = useState(initialState);

  const validate = (formData: TFormData) => {
    for (const key in formData) {
      let pattern: RegExp;
      switch (key) {
        case 'email':
          pattern = emailPattern;
          break;
        case 'password':
          pattern = passwordPattern;
          break;
        case 'name':
          pattern = namePattern;
          break;
        default:
          pattern = /.+/;
      }
      setErrors({ ...errors, [key]: !pattern.test(formData[key]) });

      if (key === 'repPassword')
        setErrors({
          ...errors,
          repPassword: formData[key] !== formData.password
        });
    }
  };
  console.log(errors);
  return [errors, validate] as const;
};
