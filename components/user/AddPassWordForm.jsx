import { intergratePassword } from '@lib/firebase';
import * as React from 'react';
import { useForm } from 'react-hook-form';

export default function AddPassWordForm({ email }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = React.useState([]);

  const onSubmit = ({ password, repassword }) => {
    if (password !== repassword) {
      setError([...error, 'Mật khẩu không giống nhau, xin vui lòng thử lại']);
      return;
    } else if (
      errors.password?.type === 'required' ||
      errors.repassword?.type === 'required'
    ) {
      setError([...error, 'Xin vui lòng điền đủ mật khẩu để hoàn tất']);
    } else if (
      errors.password?.type === 'minLength' ||
      errors.repassword?.type === 'minLength'
    ) {
      setError([...errors, 'Xin vui lòng thiết lập mật khẩu ít nhất 6 ký tự']);
    } else {
      intergratePassword(email, password);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="my-border bg-white flex-grow flex p-4"
    >
      <div className="w-full h-full flex-center flex-col gap-10 ">
        <label
          className="bigger-text-responsive uppercase font-medium"
          htmlFor="username"
        >
          Vui lòng nhập mật khẩu để có thể đăng nhập bằng tài khoản và mật khẩu
        </label>
        <div className="w-full flex-center flex-col gap-4">
          <div className="p-4 my-border w-3/4 rounded-md flex-center">
            <p className="w-full p-2 outline-none select-none">{email}</p>
          </div>

          <div className="p-4 my-border w-3/4 rounded-md flex-center">
            <input
              onFocus={() => setError([])}
              {...register('password', {
                required: true,
                minLength: 6,
              })}
              placeholder="Mật khẩu"
              className="w-full p-2 outline-none"
              type="password"
            />
          </div>
          <div className="p-4 my-border w-3/4 rounded-md flex-center">
            <input
              onFocus={() => setError([])}
              {...register('repassword', { required: true, minLength: 6 })}
              placeholder="Nhập lại mật khẩu"
              className="w-full p-2 outline-none"
              type="password"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {error.length > 0
            ? error.map(e => (
                <p
                  key={e}
                  className="border border-black text-center p-2 rounded-lg text-lg bg-red-300"
                >
                  {e}
                </p>
              ))
            : null}
        </div>

        <button
          type="submit"
          className={`p-4 my-border w-1/2 rounded-md bg-black text-responsive text-white uppercase font-medium`}
        >
          Xác Nhận
        </button>
      </div>
    </form>
  );
}
