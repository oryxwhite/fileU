import {Form} from '../../types/interface'

export const usernameValidator = (username: string) => {
    if (!username) {
      return "Username is required";
    } else if (!new RegExp(/^[a-zA-Z\-]+$/).test(username)) {
      return "Username cannot contain special characters";
    }
    return "";
  };
  
  export const passwordValidator = (password: string) => {
    if (!password) {
      return "Password is required";
    } else if (password.length < 8) {
      return "Password must have a minimum 8 characters";
    } else if (password.length > 50) {
        return "Password must be less than 50 characters"
    }
    return "";
  };
  
  export const confirmPasswordValidator = (confirmPassword: string, form: Form) => {
    if (!confirmPassword) {
      return "Confirm password is required";
    } else if (confirmPassword.length < 8) {
      return "Confirm password must have a minimum 8 characters";
    } else if (confirmPassword.length > 50) {
        return "Password must be less than 50 characters"
    } else if (confirmPassword !== form.password) {
      return "Passwords do not match";
    }
    return "";
  };