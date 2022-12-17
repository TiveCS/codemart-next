import Link from 'next/link';
import Image from 'next/image';
import Button from '../Button';
import Nav from './Nav';
import Logo from '../../public/logo-colored.svg';

export interface Props {
  className?: string;
}

const Navbar: React.FC<Props> = (props) => {
  return (
    <nav
      className={
        'px-32 py-4 mb-12 flex flex-row justify-between items-center shadow-md ' +
        props.className
      }
    >
      <div className="flex flex-row items-center">
        <Link href={'/'} className="pr-12">
          <Image alt="CodeMart" src={Logo} />
        </Link>

        <div className="flex flex-row">
          <Nav href="/">Home</Nav>
          <Nav href="/sell">Sell Product</Nav>
          <Nav href="/browse">Browse</Nav>
          <Nav href="/forum">Forum</Nav>
        </div>
      </div>

      <div className="flex flex-row space-x-8">
        <Link href={'/login'}>
          <Button type="text" size="md" textSize="sm">
            Login
          </Button>
        </Link>

        <Link href={'/register'}>
          <Button type="primary" size="md" textSize="sm">
            Join Now
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
