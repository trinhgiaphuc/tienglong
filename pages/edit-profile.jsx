import SectionTitle from '@components/word/SectionTitle';
import Spinner from '@components/utils/Spinner';
import UsernameCheckForm from '@components/user/UsernameCheckForm';

import { useAuth } from '@lib/userContext';
import Router from 'next/router';

const EditProfilePage = () => {
  const { status, setStatus, setUser, setUsername, username } = useAuth();

  if (status === 'loading') return <Spinner />;
  if (status === 'authenticated') return Router.back();

  return (
    <div className="h-[94%] flex flex-col">
      <SectionTitle>
        Xin Vui Lòng Hoàn Tất Thủ Tục Để Tiến Hành Tạo Tài Khoản
      </SectionTitle>
      <UsernameCheckForm
        setStatus={setStatus}
        setUser={setUser}
        setUsername={setUsername}
        username={username}
      />
    </div>
  );
};

export default EditProfilePage;
