import Link from 'next/link';
import { IoGridOutline, IoSearch, IoLogOutOutline } from 'react-icons/io5';

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="navbar__item text-white bg-black px-4">
        <h1 className="navbar__item-text text-responsive hidden uppercase sm:block">
          điều hướng
        </h1>
        <IoGridOutline className="text-4xl hover:rotate-[180deg] transition-all duration-1000" />
      </div>

      <div className="navbar__item bg-white px-4">
        <input
          className="navbar__item-text w-full text-responsive p-4 outline-none placeholder:text-black hidden sm:block"
          placeholder="TÌM KIẾM"
        />
        <IoSearch className="text-4xl" />
      </div>

      <div className="navbar__item bg-white px-4">
        <input
          className="navbar__item-text w-full text-responsive p-4 outline-none placeholder:text-black hidden sm:block"
          placeholder="TÌM KIẾM"
        />
        <IoSearch className="text-4xl" />
      </div>

      <Link href="/enter" passHref>
        <div className="navbar__item bg-white px-4 cursor-pointer">
          <h1 className="navbar__item-text text-responsive flex-grow text-center uppercase hidden sm:block">
            đăng nhập/đăng ký
          </h1>
          <IoLogOutOutline className="text-4xl" />
        </div>
      </Link>
    </nav>
  );
};

export default Navigation;
