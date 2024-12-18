import { LoginContextType, LoginProviderProp } from '@/types/types';
import { createContext, useState } from 'react';

const defaultContextValue: LoginContextType = {
  isSubmitting: false,
  setIsSubmitting: () => {},
};

export const LoginContext =
  createContext<LoginContextType>(defaultContextValue);

export const LoginProvider = ({ children }: LoginProviderProp) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <LoginContext.Provider value={{ isSubmitting, setIsSubmitting }}>
      {children}
    </LoginContext.Provider>
  );
};
