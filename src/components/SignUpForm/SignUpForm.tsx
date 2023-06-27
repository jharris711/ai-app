'use client';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';

const SignUpForm = () => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const ref = useRef<HTMLFormElement>(null);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    import('preline');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ref.current) return;

    const formData = new FormData(ref.current);

    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const confirmPassword = formData.get('confirm-password')?.toString();

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    const user = {
      email: email ?? '',
      password: password ?? '',
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    };

    const { error } = await supabase.auth.signUp(user);

    if (error) {
      if (error.message.toLowerCase().includes('email')) {
        setEmailError(error.message);
      }
      if (error.message.toLowerCase().includes('password')) {
        setPasswordError(error.message);
      }
      return;
    }

    router.refresh();
    router.push('/confirm');
  };

  return (
    <form ref={ref} onSubmit={handleSubmit}>
      <div className='grid gap-y-4'>
        <div>
          <label htmlFor='email' className='block text-sm mb-2 dark:text-white'>
            Email address
          </label>
          <div className='relative'>
            <input
              type='text'
              id='email'
              name='email'
              className='py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
              required
              aria-describedby='email-error'
            />
            <div
              className={`${
                !emailError ? 'hidden' : ''
              } absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3`}
            >
              <svg
                className='h-5 w-5 text-red-500'
                width='16'
                height='16'
                fill='currentColor'
                viewBox='0 0 16 16'
                aria-hidden='true'
              >
                <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
              </svg>
            </div>
          </div>
          <p
            className={`${
              !emailError ? 'hidden' : ''
            } text-xs text-red-600 mt-2`}
            id='email-error'
          >
            {emailError}
          </p>
        </div>
        <div>
          <label
            htmlFor='password'
            className='block text-sm mb-2 dark:text-white'
          >
            Password
          </label>
          <div className='relative'>
            <input
              type='password'
              id='password'
              name='password'
              className='py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
              required
              aria-describedby='password-error'
            />
            <div
              className={`${
                !passwordError ? 'hidden' : ''
              } absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3`}
            >
              <svg
                className='h-5 w-5 text-red-500'
                width='16'
                height='16'
                fill='currentColor'
                viewBox='0 0 16 16'
                aria-hidden='true'
              >
                <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
              </svg>
            </div>
          </div>
          <p
            className={`${
              !passwordError ? 'hidden' : ''
            } text-xs text-red-600 mt-2`}
            id='password-error'
          >
            {passwordError}
          </p>
        </div>
        <div>
          <label
            htmlFor='confirm-password'
            className='block text-sm mb-2 dark:text-white'
          >
            Confirm Password
          </label>
          <div className='relative'>
            <input
              type='password'
              id='confirm-password'
              name='confirm-password'
              className='py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
              required
              aria-describedby='confirm-password-error'
            />
            <div
              className={`${
                !confirmPasswordError ? 'hidden' : ''
              } absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3`}
            >
              <svg
                className='h-5 w-5 text-red-500'
                width='16'
                height='16'
                fill='currentColor'
                viewBox='0 0 16 16'
                aria-hidden='true'
              >
                <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
              </svg>
            </div>
          </div>
          <p
            className={`${
              !confirmPasswordError ? 'hidden' : ''
            } text-xs text-red-600 mt-2`}
            id='confirm-password-error'
          >
            {confirmPasswordError}
          </p>
        </div>
        <div className='flex items-center'>
          <div className='flex' onClick={() => setChecked(!checked)}>
            <input
              required
              defaultChecked={checked}
              id='remember-me'
              name='remember-me'
              type='checkbox'
              className='shrink-0 mt-0.5 border-gray-200 rounded text-amber-600 pointer-events-none focus:ring-amber-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-amber-500 dark:checked:border-amber-500 dark:focus:ring-offset-gray-800'
            />
          </div>
          <div className='ml-3'>
            <label htmlFor='remember-me' className='text-sm dark:text-white'>
              I accept the{' '}
              <a
                className='text-amber-600 decoration-2 hover:underline font-medium'
                href='#'
              >
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>

        <button
          type='submit'
          className='py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-amber-500 text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800'
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
