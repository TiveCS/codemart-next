import Link from 'next/link';

export interface Props {
  href?: string;
  children: string;
}

const Category: React.FC<Props> = ({ children, href = '#' }: Props) => {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-xs rounded-full bg-recandy-blue-50 text-recandy-blue-500"
    >
      {children}
    </Link>
  );
};

export default Category;
