import Image from 'next/image';
import { ProductWithAuthor } from '../../../pages/api/products/[id]';

interface BodyProductProps {
  product: ProductWithAuthor;
}

const BodyProduct: React.FC<BodyProductProps> = ({
  product,
}: BodyProductProps) => {
  return (
    <div>
      <div className="flex items-center justify-center w-full mb-8">
        <Image
          src={product.image_url as string}
          alt={product.title}
          width={700}
          height={500}
          loading="lazy"
        />
      </div>

      <h4 className="mb-2 text-lg font-medium">Description</h4>
      <p className="text-base leading-loose">{product.description}</p>
    </div>
  );
};

export default BodyProduct;
