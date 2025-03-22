import { useContext } from 'react';
import { FilterContext } from '@/context/FilterContext';
import { FilterContextType } from '@/types/types';

export function useFilters(): FilterContextType {
  const context = useContext(FilterContext);

  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }

  return context;
}
