import { ProductWithAuthor } from '../../../pages/api/products/[id]';

interface BodyProductProps {
  product: ProductWithAuthor;
}

const BodyProduct: React.FC<BodyProductProps> = ({
  product,
}: BodyProductProps) => {
  return (
    <div className="">
      <h4 className="mb-2 text-lg font-medium">Description</h4>
      <p className="text-base leading-loose">{product.description}</p>
    </div>
  );
};

export default BodyProduct;
