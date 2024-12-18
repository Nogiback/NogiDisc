import { ReactNode } from 'react';

export type AuthContextType = {
  authUser: AuthUser | null;
  setAuthUser: (user: AuthUser | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isLoading: boolean;
};

export type LoginContextType = {
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
};

export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePic?: string;
  accessToken?: string;
  message?: string;
};

export type AuthProviderProp = {
  children: ReactNode;
};

export type LoginProviderProp = {
  children: ReactNode;
};

export type ProtectedRouteProp = {
  children: ReactNode;
};

export type LoginFormData = {
  email: string;
  password: string;
};
