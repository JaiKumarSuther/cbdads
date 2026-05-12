import AuthSplitLayout from '@/components/auth/AuthSplitLayout';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import React from 'react';

const ForgotPasswordPage = () => {
  return (
    <AuthSplitLayout>
      <ForgotPasswordForm />
    </AuthSplitLayout>
  );
};

export default ForgotPasswordPage;