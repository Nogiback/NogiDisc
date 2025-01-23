/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import { DiscOption, SearchDiscFormProps } from '@/types/types';

export function SearchDiscForm({ setSearchedDisc }: SearchDiscFormProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const animatedComponents = makeAnimated();

  const selectStyles = {
    control: (styles: any) => ({
      ...styles,
      color: 'black dark:white !important',
      backgroundColor: 'white',
    }),
    singleValue: (styles: any) => ({ ...styles, color: 'black' }),
    input: (styles: any) => ({ ...styles, color: 'black' }),
    option: (styles: any) => ({
      ...styles,
      backgroundColor: 'white',
      color: 'black',
    }),
  };

  const loadOptions = async (): Promise<DiscOption[]> => {
    try {
      const response = await fetch(
        `https://discit-api.fly.dev/disc?name=${searchQuery}`,
      );
      const data = await response.json();

      // Ensure data is an array of objects with a 'name' field
      return data.map((item: DiscOption) => ({
        name: item.name,
        id: item.id,
        brand: item.brand,
        category: item.category,
        speed: item.speed,
        glide: item.glide,
        turn: item.turn,
        fade: item.fade,
      }));
    } catch (error) {
      console.error('Error fetching options:', error);
      return [];
    }
  };

  return (
    <AsyncSelect<DiscOption>
      cacheOptions
      components={animatedComponents}
      loadOptions={loadOptions}
      getOptionLabel={(option) =>
        `${option?.name} (${option.speed}/${option.glide}/${option.turn}/${option.fade})`
      }
      onInputChange={(value) => setSearchQuery(value)}
      onChange={(option) => setSearchedDisc(option ? option : null)}
      placeholder='Search for a disc...'
      styles={selectStyles}
      noOptionsMessage={() => 'No discs found'}
    />
  );
}
