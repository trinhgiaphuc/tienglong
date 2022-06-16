import * as React from 'react';

import SectionTitle from '@components/word/SectionTitle';
import Spinner from '@components/utils/Spinner';

import { useAuth } from '@lib/userContext';
import Router from 'next/router';
import CompleteAccountForm from '@components/user/CompleteAccountForm';

const EditProfilePage = () => {
  const { status, setStatus, setUser } = useAuth();

  if (status === 'loading') return <Spinner />;
  if (status === 'authenticated') {
    Router.push('/');
    return null;
  }

  return (
    <div className="h-[94%] flex flex-col">
      <SectionTitle>
        Xin Vui Lòng Hoàn Tất Thủ Tục Để Tiến Hành Tạo Tài Khoản
      </SectionTitle>
      <CompleteAccountForm setStatus={setStatus} setUser={setUser} />
    </div>
  );
};

export default EditProfilePage;
