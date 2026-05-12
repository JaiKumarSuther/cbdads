import AuthSplitLayout from '@/components/auth/AuthSplitLayout';
import LoginForm from '@/components/auth/LoginForm';
import React from 'react';

const LoginPage = () => {
  return (
    <AuthSplitLayout>
      <LoginForm />
    </AuthSplitLayout>
  );
};

export default LoginPage;