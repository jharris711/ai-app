import type { Session } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';

const Home = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className='bg-white dark:bg-gray-800 min-h-screen'>
      <div className='bg-white dark:bg-gray-800'>
        <div className='max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8'>
          <div className='flex justify-center'>
            <a
              className='group inline-block bg-white/[.05] hover:bg-gray-300 dark:hover:bg-white/[.1] border border-white/[.05] p-1 pl-4 rounded-full shadow-md'
              href='/'
            >
              <p className='mr-2 inline-block dark:text-white text-gray-700 text-sm'>
                AI App is live. Check it out
              </p>
              <span className='dark:group-hover:bg-white/[.1] group-hover:bg-gray-400 py-2 px-3 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 dark:bg-white/[.075] font-semibold dark:text-white text-gray-700 text-sm'>
                <svg
                  className='w-2.5 h-2.5'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                >
                  <path
                    d='M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
              </span>
            </a>
          </div>
          <div className='max-w-3xl text-center mx-auto'>
            <h1 className='block font-medium text-gray-700 dark:text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>
              A new ChatGPT alternative
            </h1>
          </div>

          <div className='max-w-3xl text-center mx-auto'>
            <p className='text-lg dark:text-gray-400 text-gray-500'>
              AI App is an application powered by the OpenAI api
            </p>
          </div>

          <div className='text-center'>
            <a
              className='inline-flex justify-center items-center gap-x-3 text-center bg-amber-500 shadow-lg shadow-transparent hover:bg-amber-600 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800'
              href={session ? '/ai-app' : '/signup'}
            >
              Get started
              <svg
                className='w-2.5 h-2.5'
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
              >
                <path
                  d='M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
