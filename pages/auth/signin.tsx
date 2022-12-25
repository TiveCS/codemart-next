import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession, signIn } from 'next-auth/react';
import Head from 'next/head';
import Button from '../../components/Button';

type Props = {
  session: Session | null;
};

export default function LoginPage({ session }: Props) {
  return (
    <>
      <Head>
        <title>CodeMart - Login</title>
      </Head>
      <div className="flex flex-row items-center justify-center py-32 bg-recandy-white-100">
        <div className="flex flex-col px-8 py-12 space-y-4 shadow-lg w-3/10 bg-recandy-white-0">
          <h1 className="text-2xl font-bold text-center text-recandy-blue-600">
            Welcome Back
          </h1>
          <p className="tracking-wide text-center">
            Enter your credentials to access your account
          </p>
          <br />

          <>
            <Button
              type="primary"
              size="lg"
              onClick={() =>
                signIn('google', {
                  redirect: true,
                  callbackUrl: '/',
                })
              }
            >
              Sign in with Google
            </Button>
          </>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({
    ctx: context,
  });

  if (session) {
    return {
      redirect: {
        destination: '/',
      },
      props: { session },
    };
  }

  return { props: {} };
};
