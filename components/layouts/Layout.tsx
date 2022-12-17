import { Poppins } from '@next/font/google';
import Footer from '../Footer';
import Navbar from '../Navbar/Navbar';

export interface Props {
  children: React.ReactNode;
}

const poppins = Poppins({
  weight: ['400', '500', '600'],
  style: ['normal'],
  subsets: ['latin'],
});

const Layout: React.FC<Props> = (props) => {
  return (
    <>
      <Navbar className={poppins.className} />
      <main className={poppins.className}>{props.children}</main>

      <Footer className={poppins.className} />
    </>
  );
};

export default Layout;
