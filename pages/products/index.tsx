import { Product } from '@prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/pages/Browse/ProductCard';
import SearchBar from '../../components/pages/Browse/SearchBar';
import Sidebar from '../../components/pages/Browse/Sidebar';
import { GetResponse, ProductForBrowse } from '../api/products';

interface Props {}

const BrowsePage: React.FC<Props> = () => {
  // bikin state buat ngimpen data produk
  //const [products, setProduct] = useState<object>({});
  const [products, setProduct] = useState<ProductForBrowse[]>([]);
  const [search, setSearch] = useState<string>('');
  
  useEffect(() => {
    getDataFromAPI();
  }, []);

  const getDataFromAPI = async () => {
    try {
      // Mengirim permintaan GET ke API
      const response = await axios.get('/api/products');

      // Mendapatkan data dari respons
      const data: GetResponse = response.data;
      // nyimpen data ke state nya
      setProduct(data.products);

      // Menampilkan data di console
      console.log(data);
    } catch (error: any) {
      // Tampilkan pesan error jika terjadi masalah saat mengirim permintaan
      console.error(error.message);
    }
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
  };

  return (
    <>
      <main className="flex flex-row justify-between px-32 py-16 bg-recandy-white-50">
        <Sidebar />

        <div className="w-3/4">
          <SearchBar onChange={handleSearchChange}/>

          <section
            id="products"
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* buat looping pake variable state yg product */}
            {products.map((product) => {
              const authorName: string = product.author.name as string;
              const categories: string[] = product.categories.map(
                (c) => c.name,
              );

              if (search && !product.title.includes(search)) return null;
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  author={authorName}
                  categories={categories}
                  title={product.title}
                  image={product.image_url ?? ''}
                  price={product.price}
                />
              );
            })}
          </section>
        </div>
      </main>
    </>
  );
};

export default BrowsePage;
