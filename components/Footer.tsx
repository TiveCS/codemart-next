import Link from 'next/link';

export interface Props {
  className?: string;
}

const Footer: React.FC<Props> = (props) => {
  return (
    <>
      <footer
        className={
          'px-32 py-8 bg-recandy-blue-300 text-recandy-white-0 ' +
          props.className
        }
      >
        <div className="flex flex-row justify-between pr-24 mt-12 mb-24">
          <div className="flex flex-row items-center space-x-48">
            <div className="flex flex-col space-y-2">
              <h4 className="text-lg font-semibold">CodeMart</h4>
              <Link href="#">Browse</Link>
              <Link href="#">Post Product</Link>
              <Link href="#">Contact Us</Link>
            </div>

            <div className="flex flex-col space-y-2">
              <h4 className="text-lg font-semibold">Follow Us</h4>
              <Link href="#">Twitter</Link>
              <Link href="#">Instagram</Link>
              <Link href="#">Facebook</Link>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <h4 className="text-lg font-semibold">Email</h4>
            <Link href="mailto:support@codemart.com">support@codemart.com</Link>
          </div>
        </div>

        <div className="text-sm font-light text-center">
          <p>Copyright © 2022 Rehoukrel Studio and Blue Recandy.</p>
          <p>Illustration by Undraw.co</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
