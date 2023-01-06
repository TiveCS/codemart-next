import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ProductWithAuthor } from '../../../pages/api/products/[id]';
import Button from '../../Button';

interface HeroProductProps {
  product: ProductWithAuthor;
}

const HeroProduct: React.FC<HeroProductProps> = ({ product }) => {
  const price = product.price > 0 ? '$' + product.price.toString() : 'FREE';

  // format date of updated_at to: 1 day ago, 2 days ago or in format of dd/mm/yyyy
  const updatedAt = new Date(product.updated_at);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - updatedAt.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const readableUpdatedAt =
    diffDays <= 14
      ? diffDays > 1
        ? `${diffDays} days ago`
        : 'Today'
      : `${updatedAt.getDate()}/${
          updatedAt.getMonth() + 1
        }/${updatedAt.getFullYear()}`;

  const { data: session, status } = useSession();
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    axios.delete(`/api/products/${product.id}`).then((res) => {
      if (res.status === 200) {
        router.push('/products');
        alert('Product deleted successfully');
      }
    });
  };

  return (
    <div className="grid justify-between grid-flow-col pb-4 mb-8 border-b">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-medium">{product.title}</h2>
          <h4 className="text-base text-recandy-blue-600">
            {product.author.name}
          </h4>
        </div>

        <div>
          <p className="text-sm text-recandy-gray-800">
            Last Update <span>{readableUpdatedAt}</span>
          </p>
        </div>
      </div>
      <div className="grid items-center justify-center grid-flow-col gap-8 h-fit">
        <Button type="primary" size="md" textSize="sm">
          Buy for {price}
        </Button>

        {status === 'authenticated' &&
          session?.user?.name === product.author.name && (
            <Button
              type="outline"
              size="md"
              textSize="sm"
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
      </div>
    </div>
  );
};

export default HeroProduct;
