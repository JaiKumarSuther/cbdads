import AuthSplitLayout from '@/components/auth/AuthSplitLayout';
import SignupForm from '@/components/auth/SignupForm';
import React from 'react';

const SignupPage = () => {
  return (
    <AuthSplitLayout>
      <SignupForm />
    </AuthSplitLayout>
  );
};

export default SignupPage;