import { Product } from '@prisma/client';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BodyProduct from '../../components/pages/DetailProduct/BodyProduct';
import HeroProduct from '../../components/pages/DetailProduct/HeroProduct';
import { ProductWithAuthor } from '../api/products/[id]';

interface DetailProductProps {
  product: ProductWithAuthor;
}

const DetailProduct = (props: DetailProductProps) => {
  const router = useRouter();

  const { product } = props;

  console.log(product);

  return (
    <>
      <Head>
        <title>{product.title} | Product</title>
      </Head>
      <div className="px-8 py-12 mx-24 my-16 rounded-sm shadow-md">
        <HeroProduct product={product} />

        <BodyProduct product={product} />
      </div>
    </>
  );
};

export default DetailProduct;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const host = process.env.NEXTAUTH_URL;

  const { data } = await axios.get(`${host}/api/products/${id}`);
  const { product } = data;

  if (!product)
    return {
      notFound: true,
    };

  return {
    props: {
      product,
    },
  };
};
