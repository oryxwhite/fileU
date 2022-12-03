import { useState } from "react";
import { Form, Error } from "../../types/interface"

import {
  usernameValidator,
  passwordValidator,
  confirmPasswordValidator,
} from "./validators";

const touchErrors = (errors: Error) => {
    return Object.entries(errors).reduce((acc: any, [field, fieldError]) => {
      acc[field] = {
        ...fieldError,
        dirty: true,
      };
      return acc;
    }, {});
  };

  interface ErrorState {
    [key: string]: Error
    username: Error,
    password: Error,
    confirmPassword: Error
  }

  export const useRegistrationFormValidator = (form: Form) => {
    const [errors, setErrors] = useState<ErrorState>({
      username: {
        dirty: false,
        error: false,
        message: "",
      },
      password: {
        dirty: false,
        error: false,
        message: "",
      },
      confirmPassword: {
        dirty: false,
        error: false,
        message: "",
      },
    })

    interface ValidateFormProps {
        form: Form,
        field: string,
        errors: Error,
        forceTouchErrors?: boolean
    }

    const validateForm = ({ form, field, errors, forceTouchErrors = false }: ValidateFormProps) => {
        let isValid = true;
    
        // Create a deep copy of the errors
        let nextErrors = JSON.parse(JSON.stringify(errors));
    
        // Force validate all the fields
        if (forceTouchErrors) {
          nextErrors = touchErrors(errors);
        }
    
        const { username, password, confirmPassword } = form;
    
        if (nextErrors.username.dirty && (field ? field === "username" : true)) {
          const usernameMessage = usernameValidator(username);
          nextErrors.username.error = !!usernameMessage;
          nextErrors.username.message = usernameMessage;
          if (!!usernameMessage) isValid = false;
        }
    
        if (nextErrors.password.dirty && (field ? field === "password" : true)) {
          const passwordMessage = passwordValidator(password);
          nextErrors.password.error = !!passwordMessage;
          nextErrors.password.message = passwordMessage;
          if (!!passwordMessage) isValid = false;
        }
    
        if (
          nextErrors.confirmPassword.dirty &&
          (field ? field === "confirmPassword" : true)
        ) {
          const confirmPasswordMessage = confirmPasswordValidator(
            confirmPassword,
            form
          );
          nextErrors.confirmPassword.error = !!confirmPasswordMessage;
          nextErrors.confirmPassword.message = confirmPasswordMessage;
          if (!!confirmPasswordMessage) isValid = false;
        }
    
        setErrors(nextErrors);
    
        return {
          isValid,
          errors: nextErrors,
        };
      };
    
    // type FormField = ("username" | "password" | "confirmPassword")
    

    // const onBlurField = (e: React.FormEvent<HTMLInputElement>) => {
    //     const field= e.currentTarget.name;
    //     const fieldError: Error = errors[field];
    //     if (fieldError.dirty) return;
    
    //     const updatedErrors: ErrorState = {
    //       ...errors,
    //       [field]: {
    //         ...errors[field],
    //         dirty: true,
    //       },
    //     };
    
    //     validateForm({ form, field, errors: updatedErrors });
    //   };
    
      return {
        validateForm,
        // onBlurField,
        errors,
      };
    };
