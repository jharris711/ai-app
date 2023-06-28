'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';
import ConfirmIcon from '@/svgIcons/ConfirmIcon';
import CloseIcon from '@/svgIcons/CloseIcon';
import ErrorIcon from '@/svgIcons/ErrorIcon';
import InfoCircleIcon from '@/svgIcons/InfoCircleIcon';

interface Toast {
  type: string;
  message: string;
}

const LoginForm = () => {
  const [toast, setToast] = useState<Toast | null>(null);
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    import('preline');
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!ref.current) return;

    const formData = new FormData(ref.current);

    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setToast({ type: 'error', message: error.message });
      return;
    }

    setToast({ type: 'success', message: 'Signed in successfully' });

    setTimeout(() => {
      setToast(null);
      router.refresh();
      router.push('/');
    }, 1500);
  };

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <form ref={ref} onSubmit={handleSubmit}>
      {toast ? (
        <div
          id='toast-bottom-left'
          className='animate-fade-down animate-ease-in-out fixed flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 rounded-lg shadow bottom-5 left-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800 z-50'
          role='alert'
        >
          {toast.type === 'success' ? (
            <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-amber-100 rounded-lg dark:bg-green-800 dark:text-blue-200'>
              <ConfirmIcon className='w-5 h-5' />
              <span className='sr-only'>Confirm icon</span>
            </div>
          ) : toast.type === 'error' ? (
            <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200'>
              <ErrorIcon className='w-5 h-5' />
              <span className='sr-only'>Error icon</span>
            </div>
          ) : (
            <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-amber-100 rounded-lg dark:bg-blue-800 dark:text-blue-200'>
              <InfoCircleIcon className='w-5 h-5' />
              <span className='sr-only'>Info icon</span>
            </div>
          )}

          <div className='ml-3 text-sm font-normal'>{toast.message}</div>
          <button
            type='button'
            className='ml-auto -mx-1.5 -my-1.5 bg-red-100 text-gray-400 hover:text-red-600 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700'
            data-dismiss-target='#toast-danger'
            aria-label='Close'
            onClick={closeToast}
          >
            <span className='sr-only'>Close</span>
            <CloseIcon className='w-5 h-5' />
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className='grid gap-y-4'>
        <div>
          <label htmlFor='email' className='block text-sm mb-2 dark:text-white'>
            Email address
          </label>
          <div className='relative'>
            <input
              type='email'
              id='email'
              name='email'
              className='py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
              required
              aria-describedby='email-error'
            />
            <div className='hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3'>
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
        </div>
        <div>
          <div className='flex justify-between items-center'>
            <label
              htmlFor='password'
              className='block text-sm mb-2 dark:text-white'
            >
              Password
            </label>
            <a
              className='text-sm text-amber-600 decoration-2 hover:underline font-medium'
              href='../examples/html/recover-account.html'
            >
              Forgot password?
            </a>
          </div>
          <div className='relative'>
            <input
              type='password'
              id='password'
              name='password'
              className='py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
              required
              aria-describedby='password-error'
            />
            <div className='hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3'>
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
        </div>

        <button
          type='submit'
          className='py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-amber-500 text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800'
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
