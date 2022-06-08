import * as React from 'react';
import fetcher from '@lib/fetcher';
import { useRouter } from 'next/router';

import Spinner from '@components/utils/Spinner';
import ReLoginModal from '@components/layouts/modals/ReLoginModal';

const AdminLoginForm = () => {
  const [passCode, setPasscode] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  if (error === 'auth/id-token-expired') {
    return <ReLoginModal />;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const password = e.target[0].value;
    setLoading(true);
    router.prefetch('/admin/chatroom');

    let res = await fetcher('admin', { password });
    setLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      router.push('/admin/chatroom');
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-400 grid-item-center">
      <form
        onSubmit={handleSubmit}
        className="my-border rounded-lg bg-amber-200 p-4 font-medium shadow-md shadow-black flex-center flex-col gap-4"
      >
        <label className="text-responsive" htmlFor="code">
          Xin Mời Nhập Mật Mã
        </label>
        <input
          value={passCode}
          onChange={e => {
            setError('');
            setPasscode(e.target.value);
          }}
          id="code"
          className="input rounded-lg"
          placeholder="••••••••••••••••••"
          type="password"
        />

        {/* {error.length !== 0 ? (
          <h1 className="bg-red-400 rounded-lg p-2 border-2 border-red-600">
            {error}
          </h1>
        ) : null} */}
        <button
          disabled={passCode.length < 1}
          type="submit"
          className="uppercase flex-center my-border py-2 px-4 font-medium bg-green-400 rounded-lg"
        >
          Mở Khóa
          {loading ? (
            <div className="justify-self-end">
              <Spinner size="tini" />
            </div>
          ) : null}
        </button>
      </form>
    </div>
  );
};

export default AdminLoginForm;
