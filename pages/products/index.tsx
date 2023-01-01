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

useEffect(() => {
getDataFromAPI();
}, [])

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
  
    } catch (error) {
      // Tampilkan pesan error jika terjadi masalah saat mengirim permintaan
      console.error(error.message);
    }
  }

  
  return (
    <>
      <main className="flex flex-row justify-between px-32 py-16 bg-recandy-white-50">
        <Sidebar />

        <div className="w-3/4">
          <SearchBar />

          <section
            id="products"
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* buat looping pake variable state yg product */}
            {products.map((product) => {
              const authorName: string = product.author.name as string;
              const categories: string[] = product.categories.map((c) => c.name);

              return (
                <ProductCard key={product.id}
                  id={product.id}
                  author={authorName}
                  categories={categories}
                  title={product.title}
                  image={product.image_url ?? ''}
                  price={product.price}
                />
              );
            })}
            
            {/*}
            if (Array.isArray(products)) {
              products.map((product) => {
                return (
                  <ProductCard
                    author={product.author}
                    categories={product.categories}
                    title={product.title}
                    image={product.image}
                    price={product.price}
                  />
                );
              })
            };
            

            {products.map((product) => {
              return (
                <ProductCard
                  author={product.author}
                  categories={product.categories}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                />
              );
            })}
            
            <ProductCard
              author="BlueRecandy"
              categories={['Astro', 'TailwindCSS']}
              title="Login Page Template"
              image="/assets/img/Product_Login_Web.jpg"
              price={100}
            />

            <ProductCard
              author="TiveCS"
              categories={['React', 'TailwindCSS']}
              title="Portofolio Web Template"
              image="/assets/img/Product_Portofolio_Web.jpg"
            />

            <ProductCard
              author="Vektora Studio"
              categories={['HTML', 'TailwindCSS', 'Figma']}
              title="Fashion Landing Page Template"
              image="/assets/img/Product_Fashion_Landing.png"
              price={250}
            />

            <ProductCard
              author="Rehoukrel Studio"
              categories={['Nest.js', 'TailwindCSS', 'Vue']}
              title="REPIM Rest API Modeller App"
              image="/assets/img/Product_REPIM_Web.jpg"
              price={899}
            />

            <ProductCard
              author="Damian Schute"
              categories={['Laravel', 'TailwindCSS', 'React']}
              title="Traveling Web App"
              image="/assets/img/Product_Travel_Web.png"
              price={2159}
            />

            <ProductCard
              author="Lestaris Studios"
              categories={['Android', 'Jetpack', 'Kotlin']}
              title="Fashion Store Mobile App"
              image="/assets/img/Product_Lestari_Studios_Mobile.png"
              price={3899}
            />
            */}
          </section>
        </div>
      </main>
    </>
  );
};

export default BrowsePage;
