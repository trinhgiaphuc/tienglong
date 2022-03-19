import SectionTitle from '@components/word/SectionTitle';
import Spinner from '@components/utils/Spinner';
import UsernameCheckForm from '@components/user/UsernameCheckForm';

import { useAuth } from '@lib/userContext';
import Router from 'next/router';

const EditProfilePage = () => {
  const { status, setStatus, setUser, setUsername, username } = useAuth();

  // if (status === 'unauthenticated') return Router.back();
  // if (status === 'loading') return <Spinner />;

  return (
    <div className="h-[94%] flex flex-col">
      <SectionTitle title="Xin Vui Lòng Hoàn Tất Thủ Tục Để Tiến Hành Tạo Tài Khoản" />
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
