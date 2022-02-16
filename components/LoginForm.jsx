import { facebookProvider, googleProvider, handleSignIn } from '@lib/firebase';
import Router from 'next/router';

const LoginForm = () => {
  const handleGoBack = () => {
    Router.back();
  };

  return (
    <div className="overflow-hidden">
      <button
        className="p-4 absolute uppercase font-medium top-0 left-0"
        onClick={handleGoBack}
      >
        &larr; <span className="underline underline-offset-1">Quay Lại</span>
      </button>

      <div className="w-screen h-screen grid-item-center">
        <div className="flex-center flex-col gap-5">
          <button
            className="my-border rounded w-full uppercase font-medium p-4 shadow-sm shadow-black"
            onClick={() => handleSignIn(facebookProvider)}
          >
            Đăng Nhập Bằng Facebook
          </button>
          <button
            className="my-border rounded w-full uppercase font-medium p-4 shadow-sm shadow-black"
            onClick={() => handleSignIn(googleProvider)}
          >
            Đằng Nhập Bằng Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
