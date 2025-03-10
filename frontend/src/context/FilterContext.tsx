import { createContext, useState, ReactNode } from 'react';
import { Disc } from '@prisma/client';
import {
  FilterOptions,
  SelectedFilters,
  FilterContextType,
} from '@/types/types';

type FilterOptions = {
  brands: string[];
  names: string[];
  categories: string[];
  speeds: number[];
  glides: number[];
  turns: number[];
  fades: number[];
};

type SelectedFilters = {
  brands: string[];
  names: string[];
  categories: string[];
  speeds: number[];
  glides: number[];
  turns: number[];
  fades: number[];
};

type FilterContextType = {
  filterOptions: FilterOptions;
  selectedFilters: SelectedFilters;
  updateFilterOptions: (discs: Disc[]) => void;
  toggleFilter: (
    filterType: keyof SelectedFilters,
    value: string | number,
  ) => void;
  clearFilters: () => void;
};

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined,
);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    brands: [],
    names: [],
    categories: [],
    speeds: [],
    glides: [],
    turns: [],
    fades: [],
  });

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    brands: [],
    names: [],
    categories: [],
    speeds: [],
    glides: [],
    turns: [],
    fades: [],
  });

  const updateFilterOptions = (discs: Disc[]) => {
    const options: FilterOptions = {
      brands: [...new Set(discs.map((disc) => disc.brand))],
      names: [...new Set(discs.map((disc) => disc.name))],
      categories: [...new Set(discs.map((disc) => disc.category))],
      speeds: [...new Set(discs.map((disc) => disc.speed))],
      glides: [...new Set(discs.map((disc) => disc.glide))],
      turns: [...new Set(discs.map((disc) => disc.turn))],
      fades: [...new Set(discs.map((disc) => disc.fade))],
    };

    setFilterOptions(options);
    // Reset selected filters when options change
    setSelectedFilters({
      brands: [],
      names: [],
      categories: [],
      speeds: [],
      glides: [],
      turns: [],
      fades: [],
    });
  };

  const toggleFilter = (
    filterType: keyof SelectedFilters,
    value: string | number,
  ) => {
    setSelectedFilters((prev) => {
      const currentFilters = [...prev[filterType]];
      const valueIndex = currentFilters.indexOf(value as never);

      if (valueIndex >= 0) {
        currentFilters.splice(valueIndex, 1);
      } else {
        currentFilters.push(value as never);
      }

      return {
        ...prev,
        [filterType]: currentFilters,
      };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({
      brands: [],
      names: [],
      categories: [],
      speeds: [],
      glides: [],
      turns: [],
      fades: [],
    });
  };

  return (
    <FilterContext.Provider
      value={{
        filterOptions,
        selectedFilters,
        updateFilterOptions,
        toggleFilter,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
