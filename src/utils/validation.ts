export const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
export const namePattern = /^[a-zа-яё\s]+$/i;

export const isValidInput = (name: string, value: string) => {
  let pattern: RegExp;
  switch (name) {
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

  return pattern.test(value);
};

export const isValidForm = (state: { [key: string]: boolean }) =>
  !Object.values(state).some((item) => item === true);
