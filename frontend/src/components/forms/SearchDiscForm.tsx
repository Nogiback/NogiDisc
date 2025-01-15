import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';

interface DiscOption {
  name: string;
  id: string; // Adjust based on your API's response
}

interface SearchDiscFormProps {
  setSearchedDisc: (value: string | null) => void;
}

export function SearchDiscForm({ setSearchedDisc }: SearchDiscFormProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const animatedComponents = makeAnimated();

  // Function to fetch and transform API data into the expected format
  const loadOptions = async (): Promise<DiscOption[]> => {
    try {
      const response = await fetch(
        `https://discit-api.fly.dev/disc?name=${searchQuery}`,
      );
      const data = await response.json();

      // Ensure data is an array of objects with a 'name' field
      return data.map((item: DiscOption) => ({
        name: item.name,
        id: item.id, // Adjust based on your API's response structure
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
      getOptionLabel={(option) => option?.name}
      getOptionValue={(option) => option?.name}
      onInputChange={(value) => setSearchQuery(value)}
      onChange={(option) => setSearchedDisc(option ? option.name : null)}
    />
  );
}
