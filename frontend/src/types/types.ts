import { ReactNode } from 'react';

export type AuthContextType = {
  authUser: AuthUser | null;
  loading: boolean;
  login: (userData: AuthUser) => void;
  logout: () => void;
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

export type ProtectedRouteProp = {
  children: ReactNode;
};
