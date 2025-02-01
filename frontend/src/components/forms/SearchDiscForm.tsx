/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import { DiscOption, SearchDiscFormProps } from '@/types/types';
import axios from 'axios';
import { useCallback } from 'react';
import { debounce } from 'lodash';

export function SearchDiscForm({ setSearchedDisc }: SearchDiscFormProps) {
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

  const loadOptions = async (inputValue: string): Promise<DiscOption[]> => {
    if (!inputValue) return [];
    try {
      const response = await axios.get(
        `https://discit-api.fly.dev/disc?name=${inputValue}`,
      );
      const data = await response.data;

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

  const debouncedLoadOptions = useCallback(
    debounce((inputValue: string, callback) => {
      loadOptions(inputValue).then(callback);
    }, 300),
    [],
  );

  return (
    <AsyncSelect<DiscOption>
      cacheOptions
      components={animatedComponents}
      loadOptions={debouncedLoadOptions}
      getOptionLabel={(option) =>
        `${option?.name} (${option.speed}/${option.glide}/${option.turn}/${option.fade})`
      }
      onChange={(option) => setSearchedDisc(option ? option : null)}
      placeholder='Search for a disc...'
      styles={selectStyles}
      noOptionsMessage={() => 'No discs found'}
    />
  );
}
