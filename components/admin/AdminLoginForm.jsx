import fetcher from '@lib/fetcher';
import { auth } from '@lib/firebase';
import Router from 'next/router';
import { useState } from 'react';

import Spinner from '@components/Spinner';

const AdminLoginForm = () => {
  const [passCode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const password = e.target[0].value;

    setLoading(true);
    const result = await fetcher('admin', {
      uid: auth.currentUser.uid,
      password,
    });
    if (result.error) {
      setLoading(false);
      setError(result.error);
    } else {
      setLoading(false);
      Router.push('/admin/chatroom');
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
          placeholder="••••••"
          type="password"
        />

        {error.length !== 0 ? (
          <h1 className="bg-red-400 rounded-lg p-2 border-2 border-red-600">
            {error}
          </h1>
        ) : null}
        <button className="uppercase flex-center my-border py-2 px-4 font-medium bg-green-400 rounded-lg">
          Mở Khóa
          {loading ? (
            <div className="justify-self-end">
              <Spinner size={8} />
            </div>
          ) : null}
        </button>
      </form>
    </div>
  );
};

export default AdminLoginForm;
