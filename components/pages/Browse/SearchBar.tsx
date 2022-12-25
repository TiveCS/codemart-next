import Link from 'next/link';
import Button from '../../Button';

const SearchBar: React.FC = () => {
  return (
    <form className="grid grid-flow-col grid-cols-4 gap-8 mb-8">
      <input
        className="w-full col-span-3 px-4 py-2 text-sm border rounded-sm shadow-lg border-gray-50"
        placeholder="Search product"
        type="text"
        name="search-product"
        id="search-product"
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
