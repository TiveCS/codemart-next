import Link from 'next/link';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';

export default function LoginPage() {
  return (
    <div className="flex flex-row items-center justify-center py-32 bg-recandy-white-100">
      <form
        action=""
        className="flex flex-col px-8 py-12 space-y-4 shadow-lg w-3/10 bg-recandy-white-0"
      >
        <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
        <p className="tracking-wide text-center">
          Enter your credentials to access your account
        </p>
        <br />
        <FormInput id="email" type={'email'} placeholder={'Email Address'} />
        <FormInput id="password" type={'password'} placeholder={'Password'} />
        <Button size={'lg'} type={'primary'}>
          Log in
        </Button>
        <br />
        <div className="text-center">
          Don&apos;t have account yet?{' '}
          <Link href="/register" className="text-recandy-blue-600">
            Sign Up
          </Link>
        </div>
        <Link
          href="/forgot-password"
          className="text-center text-recandy-blue-600"
        >
          Forgot your Password?
        </Link>
      </form>
    </div>
  );
}
