import { facebookProvider, googleProvider, handleSignIn } from '@lib/firebase';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';

const LoginForm = ({ referer }) => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(referer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="overflow-hidden">
      <Link href={referer} passHref>
        <button className="p-4 absolute uppercase font-medium top-0 left-0">
          &larr; <span className="underline underline-offset-1">Quay Lại</span>
        </button>
      </Link>

      <div className="w-screen h-screen grid-item-center">
        <div className="flex-center flex-col gap-5">
          <button
            className="login-button"
            onClick={() =>
              handleSignIn(facebookProvider).then(() => router.push(referer))
            }
          >
            Đăng Nhập Bằng Facebook
          </button>
          <button
            className="login-button"
            onClick={() =>
              handleSignIn(googleProvider).then(() => router.push(referer))
            }
          >
            Đằng Nhập Bằng Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
