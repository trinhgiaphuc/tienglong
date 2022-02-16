import Link from 'next/link';
import { Fragment } from 'react';

function Error({ error }) {
  const handleErrorMessage = error => {
    if (error?.code === 'permission-denied')
      return (
        <Fragment>
          <p className="text-responsive uppercase font-medium">
            Rất Tiếc, Bạn Cần Đăng Nhập Để Tiếp Tục
          </p>
          <Link href="/enter" passHref>
            <button className="text-responsive text-responsive uppercase my-border p-4 hover:animate-pulse">
              Đến Mục Đăng Nhập
            </button>
          </Link>
        </Fragment>
      );
  };

  return (
    <div className="h-screen flex-center flex-col gap-5">
      {handleErrorMessage(error)}
    </div>
  );
}

export default Error;
