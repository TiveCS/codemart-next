import Link from 'next/link';
import Image from 'next/image';
import Button from '../Button';
import Nav from './Nav';
import Logo from '../../public/logo-colored.svg';
import { signOut, useSession } from 'next-auth/react';

export interface Props {
  className?: string;
}

const Navbar: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();

  return (
    <nav
      className={
        'px-32 py-4 flex flex-row justify-between items-center shadow-md ' +
        props.className
      }
    >
      <div className="flex flex-row items-center">
        <Link href={'/'} className="pr-12">
          <Image alt="CodeMart" src={Logo} />
        </Link>

        <div className="flex flex-row">
          <Nav href="/">Home</Nav>
          <Nav href="/products/sell">Sell Product</Nav>
          <Nav href="/products">Browse</Nav>
          <Nav href="/forum">Forum</Nav>
        </div>
      </div>

      <div className="flex flex-row items-center space-x-8 ">
        {status === 'authenticated' ? (
          <>
            <p>{session.user?.name}</p>
            <Button type="text" textSize="sm" onClick={() => signOut()}>
              Sign Out
            </Button>
          </>
        ) : (
          <Link href={'/auth/signin'}>
            <Button type="primary" size="md" textSize="sm">
              {status === 'loading' ? 'Loading...' : 'Sign In'}
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
