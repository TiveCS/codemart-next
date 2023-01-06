import Head from 'next/head';
import Link from 'next/link';
import Button from '../../Button';
import Category from './Category';

export interface Props {
  id: number;
  title: string;
  image: string;
  categories: string[];
  author: string;
  price?: number;
}

const ProductCard: React.FC<Props> = ({
  id,
  title,
  image,
  categories,
  author,
  price,
}) => {
  const priceTag = price === 0 ? 'Free' : `$${price}`;

  return (
    <>
      <Head>
        <title>CodeMart - Browse</title>
      </Head>
      <div className="pb-8 shadow-2xl bg-recandy-white-0">
        <div className="h-1/2">
          <img className="w-full h-full" src={image} alt="" />
        </div>

        <div className="h-1/2">
          <div className="flex flex-row flex-wrap items-center mt-2 ml-3 space-x-2 h-1/3">
            {categories.map((category) => (
              <Category key={category}>{category}</Category>
            ))}
          </div>

          <div className="flex flex-col justify-between px-4 py-4 space-y-4 h-2/3">
            <p className="text-xs text-recandy-gray-800">{author}</p>

            <Link href={`/products/${id}`}>
              <h5 className="text-base font-medium">{title}</h5>
            </Link>

            <div className="flex flex-row items-center justify-between">
              <p className="text-sm text-recandy-blue-700">{priceTag}</p>

              <Link href={`/products/${id}`}>
                <Button type="primary" textSize="sm">
                  Show Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
