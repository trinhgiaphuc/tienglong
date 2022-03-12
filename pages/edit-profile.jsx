import SectionTitle from '@components/word/SectionTitle';
import Spinner from '@components/utils/Spinner';
import UsernameCheckForm from '@components/user/UsernameCheckForm';

import { useAuth } from '@lib/userContext';
import Router from 'next/router';

const EditProfilePage = () => {
  const { setStatus, setUser, setUsername, username } = useAuth();

  if (username) return Router.back();
  // if (username === null) return <Spinner />;

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
