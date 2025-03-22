import { ReactNode } from 'react';
import { Disc } from '@prisma/client';

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

export type User = {
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
};

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

export type ProfileFormData = {
  email: string;
  firstName: string;
  lastName: string;
};

export type AddDiscFormProps = {
  searchedDisc: SearchedDisc | null;
  setOpen: (open: boolean) => void;
};

export type EditDiscFormProps = {
  disc: Disc;
  setOpen: (open: boolean) => void;
};

export type AddDiscFormData = {
  brand: string;
  name: string;
  weight: number;
  category: string;
  plastic: string;
  colour: string;
  speed: number;
  glide: number;
  turn: number;
  fade: number;
  bagID?: string;
};

export type EditDiscFormData = {
  id: string;
  brand: string;
  name: string;
  weight: number;
  category: string;
  plastic: string;
  colour: string;
  speed: number;
  glide: number;
  turn: number;
  fade: number;
  bagID?: string;
};

export type AddBagFormData = {
  name: string;
};

export type SearchDiscFormProps = {
  setSearchedDisc: (value: SearchedDisc | null) => void;
};

export type AddBagFormProps = {
  setOpen: (open: boolean) => void;
};

export type DiscOption = {
  name: string;
  id: string;
  brand: string;
  category: string;
  speed: string;
  glide: string;
  turn: string;
  fade: string;
};

export type SearchedDisc = {
  id: string;
  name: string;
  brand: string;
  category: string;
  speed: string;
  glide: string;
  turn: string;
  fade: string;
};

export type AppSidebarProps = {
  selectedBag: string;
  setSelectedBag: (selectedBag: string) => void;
};

export type NavBagsProps = {
  setSelectedBag: (selectedBag: string) => void;
};

export type DiscsContainerProps = {
  toggleView: string;
  selectedBag: string;
};

export type DiscCardProps = {
  disc: Disc;
};

export type DiscCardListProps = {
  disc: Disc;
};

export type DashboardHeaderProps = {
  setToggleView: (toggleView: string) => void;
};

export type ToggleViewButtonProps = {
  setToggleView: (toggleView: string) => void;
};

export type FilterOptions = {
  brands: string[];
  names: string[];
  categories: string[];
  speeds: number[];
  glides: number[];
  turns: number[];
  fades: number[];
};

export type SelectedFilters = {
  brands: string[];
  names: string[];
  categories: string[];
  speeds: number[];
  glides: number[];
  turns: number[];
  fades: number[];
};

export type FilterContextType = {
  filterOptions: FilterOptions;
  selectedFilters: SelectedFilters;
  updateFilterOptions: (discs: Disc[]) => void;
  toggleFilter: (
    filterType: keyof SelectedFilters,
    value: string | number,
  ) => void;
  clearFilters: () => void;
};
