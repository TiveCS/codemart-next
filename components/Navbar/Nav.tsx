import Link from 'next/link';

export interface Props {
  children: string;
  href: string;
}

const Nav: React.FC<Props> = (props) => {
  return (
    <Link
      className={'px-4 text-sm hover:text-recandy-blue-600'}
      href={props.href}
    >
      {props.children}
    </Link>
  );
};

export default Nav;
