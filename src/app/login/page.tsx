import LoginForm from '@/components/LoginForm';

const LoginPage = () => {
  return (
    <section className='bg-white dark:bg-gray-800'>
      <div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12'>
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
