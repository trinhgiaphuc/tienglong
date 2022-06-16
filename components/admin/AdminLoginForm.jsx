import * as React from 'react';
import fetcher from '@lib/fetcher';
import { useRouter } from 'next/router';

import Spinner from '@components/utils/Spinner';
import ReLoginModal from '@components/layouts/modals/ReLoginModal';

import { useForm } from 'react-hook-form';

const AdminLoginForm = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  // router.prefetch('/admin/chatroom');

  async function onSubmit({ password }) {
    setLoading(true);
    let res = await fetcher('admin', { password });

    if (res.error) {
      setError(
        'password',
        { type: 'custom', message: res.error },
        { shouldFocus: true }
      );
    } else {
      setLoading(false);
      router.push('/admin/chatroom');
    }
  }

  function onError({ password }) {
    if (password.type === 'minLength') {
      setError(
        'password',
        { message: 'Password tối thiểu 6 ký tự', type: 'maxLength' },
        { shouldFocus: true }
      );
    }
  }

  return (
    <div className="h-screen w-screen bg-slate-400 grid-item-center">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="my-border rounded-lg bg-amber-200 p-4 font-medium shadow-md shadow-black flex-center flex-col gap-4"
      >
        <label className="text-responsive" htmlFor="code">
          Xin Mời Nhập Mật Mã
        </label>
        <input
          {...register('password', { minLength: 6, required: true })}
          id="code"
          className="input rounded-lg"
          placeholder="••••••••••••••••••"
          type="password"
        />

        {errors.password ? (
          <h1 className="bg-red-400 rounded-lg p-2 border-2 border-red-600">
            {errors.password.message}
          </h1>
        ) : null}
        <button className="uppercase flex-center my-border py-2 px-4 font-medium bg-green-400 rounded-lg">
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
