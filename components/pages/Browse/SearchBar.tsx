import Link from 'next/link';
import Button from '../../Button';
import { useEffect, useState } from 'react';

interface Props {
  onChange: (newSearch: string) => void;
}

const SearchBar: React.FC<Props> = ({ onChange }) => {
  
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    onChange(search);
  }, [search, onChange]);

  return (
    <form className="grid grid-flow-col grid-cols-4 gap-8 mb-8">
      <input
        className="w-full col-span-3 px-4 py-2 text-sm border rounded-sm shadow-lg border-gray-50"
        placeholder="Search product"
        type="text"
        name="search-product"
        id="search-product"
        onChange = {(e) => setSearch(e.target.value)}
      />

      <Link href={'/products/sell'}>
        <Button type="primary" textSize="sm" size="sm" width="full">
          Upload Your Product
        </Button>
      </Link>
    </form>
  );
};

export default SearchBar;
