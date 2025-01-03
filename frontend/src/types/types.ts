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

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  googleID?: string;
  profilePic?: string;
  createdAt?: string;
  updatedAt?: string;
  inventory?: Disc[];
  bags?: Bag[];
}

export interface AuthUser extends User {
  accessToken?: string;
  message?: string;
}

export type Bag = {
  id: string;
  name: string;
  discs: Disc[];
  createdAt?: string;
  updatedAt?: string;
  User: User;
  userID: string;
};

export type Disc = {
  id: string;
  user: User;
  bag?: Bag;
  manufacturer: string;
  name: string;
  weight: number;
  category: string;
  colour: string;
  speed: number;
  glide: number;
  turn: number;
  fade: number;
  createdAt?: string;
  updatedAt?: string;
  userID: string;
  bagID?: string;
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

export type SignupFormData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

export type addDiscFormData = {
  manufacturer: string;
  name: string;
  weight: number;
  category: string;
  colour: string;
  speed: number;
  glide: number;
  turn: number;
  fade: number;
  bagID?: string;
};
