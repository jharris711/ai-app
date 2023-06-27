'use client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';

const SignUpForm = () => {
  const supabase = createClientComponentClient<Database>();

  return (
    <>
      {supabase ? (
        <Auth
          supabaseClient={supabase}
          view='sign_up'
          appearance={{ theme: ThemeSupa }}
          theme='dark'
          showLinks={false}
          providers={[]}
          redirectTo='http://localhost:3000/api/auth/callback'
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default SignUpForm;