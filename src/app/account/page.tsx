import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Database } from '@/types/supabase';
import AccountForm from '@/components/AccountForm';

const AccountPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <main className='w-full min-h-screen flex justify-center mx-auto p-6 dark:bg-gray-800'>
      <div className='w-full rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700'>
        <AccountForm session={session} />
      </div>
    </main>
  );
};

export default AccountPage;
