import ProductCard from '../../components/pages/Browse/ProductCard';
import SearchBar from '../../components/pages/Browse/SearchBar';
import Sidebar from '../../components/pages/Browse/Sidebar';

interface Props {}

const BrowsePage: React.FC<Props> = () => {
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
          </section>
        </div>
      </main>
    </>
  );
};

export default BrowsePage;
