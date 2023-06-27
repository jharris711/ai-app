import SignUpForm from '@/components/SignUpForm';

const SignUpPage = () => {
  return (
    <main className='w-full flex justify-center mx-auto p-6 dark:bg-gray-800 min-h-screen'>
      <div className='mt-7 h-full max-w-lg border border-gray-300 rounded-xl shadow-sm dark:bg-gray-900 dark:border-gray-700'>
        <div className='p-4 sm:p-7'>
          <div className='text-center'>
            <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>
              Sign up
            </h1>
            <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
              Already have an account?
              <a
                className='ml-1 text-amber-600 decoration-2 hover:underline font-medium'
                href='../examples/html/signin.html'
              >
                Sign in here
              </a>
            </p>
          </div>

          <div className='mt-5'>
            <SignUpForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
