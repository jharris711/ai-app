'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';
import type { Session } from '@supabase/auth-helpers-nextjs';

const HeaderButtonGroup = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const currentPage = usePathname();
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    import('preline');
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    router.refresh();
    router.push('/login');
  };

  return (
    <div
      id='navbar-collapse-with-animation'
      className='hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block'
    >
      <div className='flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7'>
        <a
          className={`font-medium sm:py-6 ${
            currentPage === '/ai-app'
              ? 'text-amber-600 dark:text-amber-500'
              : 'text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500'
          }`}
          href='/'
          aria-current='page'
        >
          AI App
        </a>
        <a
          className={`font-medium sm:py-6 ${
            currentPage === '/account'
              ? 'text-amber-600 dark:text-amber-500'
              : 'text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500'
          }`}
          href='/account'
        >
          Account
        </a>

        {session ? (
          <button
            onClick={handleSignOut}
            className='flex items-center gap-x-2 font-medium text-gray-500 hover:text-amber-600 sm:border-l sm:border-gray-300 sm:my-6 sm:pl-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-amber-500'
          >
            <svg
              className='w-4 h-4'
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z' />
            </svg>
            Log out
          </button>
        ) : (
          <a
            className='flex items-center gap-x-2 font-medium text-gray-500 hover:text-amber-600 sm:border-l sm:border-gray-300 sm:my-6 sm:pl-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-amber-500'
            href='/login'
          >
            <svg
              className='w-4 h-4'
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z' />
            </svg>
            Log in
          </a>
        )}
      </div>
    </div>
  );
};

export default HeaderButtonGroup;
