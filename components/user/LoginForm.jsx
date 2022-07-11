import { facebookProvider, googleProvider, handleSignIn } from '@lib/firebase';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LoginForm = ({ referer }) => {
  const router = useRouter();
  const path = '/' +  referer.split('/')[3];
  
  // useEffect(() => {
    // router.prefetch(referer);
    // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="overflow-hidden">
        <button onClick={() => router.push(referer, undefined, {shallow: true})} className="p-4 absolute uppercase font-medium top-0 left-0">
          &larr; <span className="underline underline-offset-1">Quay Lại</span>
        </button>

      <div className="w-screen h-screen grid-item-center">
        <div className="flex-center flex-col gap-5">
          <button
            className="login-button"
            onClick={async () => await handleSignIn(facebookProvider, referer)}
          >
            Đăng Nhập Bằng Facebook
          </button>
          <button
            className="login-button"
            onClick={async () => await handleSignIn(googleProvider, referer)}
          >
            Đằng Nhập Bằng Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
