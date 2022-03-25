import Link from 'next/link';
import Image from 'next/image';

import { useAuth } from '@lib/userContext';
import { handleSignOut } from '@lib/firebase';

import {
  IoGridOutline,
  IoSearch,
  IoLogOutOutline,
  IoLogInOutline,
  IoPersonCircleOutline,
} from 'react-icons/io5';
import { Fragment } from 'react';

const Navigation = () => {
  const { user, username, status } = useAuth();

  return (
    <nav className="navbar h-12 z-50 sticky top-0 left-0">
      <NavigationLink role={user?.role} />

      <div className="navbar__item bg-white px-4 flex-grow">
        <input
          className="navbar__item-text w-full prose lg:prose-xl xl:prose-2xl h-full outline-none"
          placeholder="TÌM KIẾM"
        />
        <IoSearch className="prose lg:prose-xl xl:prose-2xl hidden sm:block" />
      </div>

      {status === 'authenticated' ? (
        <Link href={`/user/${user?.id}`} passHref>
          <div className="navbar__item min-w-max lg:flex-grow bg-white lg:pl-4 cursor-pointer">
            <UserTag status={status} username={username} user={user} />
          </div>
        </Link>
      ) : (
        <div className="navbar__item lg:flex-grow bg-white px-4">
          <UserTag status={status} username={username} user={user} />
        </div>
      )}

      {status === 'loading' ? null : <AuthButton status={status} />}
    </nav>
  );
};

const NavigationLink = ({ role }) => (
  <div className="flex items-center justify-between lg:flex-grow relative text-white bg-black px-4 group">
    <h2 className="hidden uppercase lg:block prose text-white">điều hướng</h2>
    <IoGridOutline className="prose lg:prose-xl xl:prose-2xl text-white group-hover:rotate-[180deg] transition-all duration-1000" />
    <div className="bg-black prose text-white w-screen h-screen lg:w-full lg:h-auto absolute bottom-0 left-0 -z-10 opacity-0 group-hover:translate-y-full group-hover:opacity-100 transition-all duration-300 ease-in">
      <ul className="flex list-none flex-col p-4 gap-4 uppercase">
        <Link passHref href="/">
          <li className="hover:underline cursor-pointer">Trang Chủ</li>
        </Link>
        <Link passHref href="/define">
          <li className="hover:underline cursor-pointer">Định Nghĩa Từ</li>
        </Link>
        <Link passHref href="/shop">
          <li className="hover:underline cursor-pointer">Shop</li>
        </Link>
        <Link passHref href="/feedback">
          <li className="hover:underline cursor-pointer">
            Phản Hồi Của Người Dùng
          </li>
        </Link>
        {role?.includes('admin') ? (
          <Link passHref href="/admin">
            <li className="hover:underline cursor-pointer">Quản Trị</li>
          </Link>
        ) : null}
        <Link passHref href="/about">
          <li className="hover:underline cursor-pointer">Về Tiếng Lòng</li>
        </Link>
      </ul>
    </div>
  </div>
);

const UserTag = ({ status, username, user }) =>
  status === 'loading' ? null : (
    <Fragment>
      <h2 className=" w-full prose lg:prose-xl xl:prose-2xl outline-none hidden lg:block">
        {status === 'authenticated' ? username : 'Khách'}
      </h2>
      {user ? (
        <div className="block aspect-square h-full">
          {/* TODO: Make Image visible on phone browser */}
          <Image
            src={user.image}
            alt="user image"
            width={500}
            height={500}
            quality={50}
            layout="responsive"
          />
        </div>
      ) : (
        <IoPersonCircleOutline className="prose lg:prose-xl xl:prose-2xl" />
      )}
    </Fragment>
  );

const AuthButton = ({ status }) => {
  const loadingAuth = () => (
    <h1 className="prose lg:prose-xl xl:prose-2xl flex-grow text-center uppercase hidden sm:block">
      {status === 'authenticated' ? 'đăng xuất' : 'đăng nhập'}
    </h1>
  );

  return status === 'authenticated' ? (
    <button
      className="navbar__item lg:flex-grow bg-white px-4 cursor-pointer"
      onClick={handleSignOut}
    >
      {loadingAuth()}
      <IoLogOutOutline className="prose lg:prose-xl xl:prose-2xl" />
    </button>
  ) : (
    <Link href="/enter" passHref>
      <button className="navbar__item  lg:flex-grow bg-white px-4 cursor-pointer">
        {loadingAuth()}
        <IoLogInOutline className="prose lg:prose-xl xl:prose-2xl" />
      </button>
    </Link>
  );
};

export default Navigation;
