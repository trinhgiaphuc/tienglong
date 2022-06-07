import * as React from 'react';

import SectionTitle from '@components/word/SectionTitle';
import Spinner from '@components/utils/Spinner';

import { useAuth } from '@lib/userContext';
import Router from 'next/router';
import CompleteForm from '@components/user/UsernameCheckForm';

const EditProfilePage = () => {
  const { status, setStatus, setUser, setUsername } = useAuth();

  React.useEffect(() => {
    if (status === 'authenticated') {
      Router.push('/');
      return null;
    }
  }, [status]);

  if (status === 'loading') return <Spinner />;

  return (
    <div className="h-[94%] flex flex-col">
      <SectionTitle>
        Xin Vui Lòng Hoàn Tất Thủ Tục Để Tiến Hành Tạo Tài Khoản
      </SectionTitle>
      <CompleteForm
        setStatus={setStatus}
        setUser={setUser}
        setUsername={setUsername}
      />
    </div>
  );
};

export default EditProfilePage;
