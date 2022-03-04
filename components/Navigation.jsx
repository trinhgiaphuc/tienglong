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
    <nav className="navbar h-[6%] z-50 sticky top-0 left-0">
      <NavigationLink role={user?.role} />

      <div className="navbar__item bg-white px-4 flex-grow">
        <input
          className="navbar__item-text w-full text-responsive h-full outline-none placeholder:text-black"
          placeholder="TÌM KIẾM"
        />
        <IoSearch className="title-responsive hidden sm:block" />
      </div>

      {status === 'authenticated' ? (
        <Link href={`/user/${user?.id}`} passHref>
          <div className="navbar__item lg:flex-grow bg-white px-4 cursor-pointer">
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
  <div className="navbar__item lg:flex-grow relative text-white bg-black px-4 group">
    <h1 className="navbar__item-text text-responsive hidden uppercase sm:block">
      điều hướng
    </h1>
    <IoGridOutline className="md:text-4xl sm:text-3xl title-responsive  group-hover:rotate-[180deg] transition-all duration-1000" />
    <div className="bg-black w-screen h-screen lg:w-full lg:h-auto absolute bottom-0 left-0 -z-10 opacity-0 group-hover:translate-y-full group-hover:opacity-100 transition-all duration-300 ease-in">
      <div className="flex flex-col text-responsive p-4 gap-4 uppercase">
        <Link passHref href="/">
          <a className="hover:underline">Trang Chủ</a>
        </Link>
        <Link passHref href="/define">
          <a className="hover:underline">Định Nghĩa Từ</a>
        </Link>
        <Link passHref href="/shop">
          <a className="hover:underline">Shop</a>
        </Link>
        <Link passHref href="/feedback">
          <a className="hover:underline">Phản Hồi Của Người Dùng</a>
        </Link>
        {role?.includes('admin') ? (
          <Link passHref href="/admin">
            <a className="hover:underline">Quản Trị</a>
          </Link>
        ) : null}
        <Link passHref href="/about">
          <a className="hover:underline">Về Tiếng Lòng</a>
        </Link>
      </div>
    </div>
  </div>
);

const UserTag = ({ status, username, user }) =>
  status === 'loading' ? null : (
    <Fragment>
      <h2 className="navbar__item-text w-full text-responsive p-4 outline-none placeholder:text-black hidden lg:block">
        {status === 'authenticated' ? username : 'Khách'}
      </h2>
      {user ? (
        <div className="aspect-square border border-black rounded-full min-w-max h-3/4 overflow-clip">
          <Image
            src={user.image}
            alt="user image"
            width={500}
            height={500}
            layout="responsive"
          />
        </div>
      ) : (
        <IoPersonCircleOutline className="title-responsive" />
      )}
    </Fragment>
  );

const AuthButton = ({ status }) => {
  const loadingAuth = () =>
    status === 'authenticated' ? (
      <h1 className="navbar__item-text text-responsive flex-grow text-center uppercase hidden sm:block">
        đăng xuất
      </h1>
    ) : (
      <h1 className="navbar__item-text text-responsive flex-grow text-center uppercase hidden sm:block">
        đăng nhập
      </h1>
    );

  return status === 'authenticated' ? (
    <button
      className="navbar__item lg:flex-grow bg-white px-4 cursor-pointer"
      onClick={handleSignOut}
    >
      {loadingAuth()}
      {status === 'authenticated' ? (
        <IoLogOutOutline className="title-responsive" />
      ) : (
        <IoLogInOutline className="title-responsive" />
      )}
    </button>
  ) : (
    <Link href="/enter" passHref>
      <button className="navbar__item  lg:flex-grow bg-white px-4 cursor-pointer">
        {loadingAuth()}
        {status === 'authenticated' ? (
          <IoLogOutOutline className="title-responsive" />
        ) : (
          <IoLogInOutline className="title-responsive" />
        )}
      </button>
    </Link>
  );
};

export default Navigation;
