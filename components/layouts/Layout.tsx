import { Poppins } from '@next/font/google';
import Head from 'next/head';
import Footer from '../Footer';
import Navbar from '../Navbar/Navbar';

export interface Props {
  children: React.ReactNode;
}

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

const Layout: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar className={poppins.className} />
      <main className={poppins.className}>{props.children}</main>

      <Footer className={poppins.className} />
    </>
  );
};

export default Layout;
