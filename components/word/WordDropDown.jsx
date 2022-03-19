import { IoEllipsisVertical } from 'react-icons/io5';
import { useState } from 'react';
import { useAuth } from '@lib/userContext';

const WordDropDown = ({ authorId }) => {
  const [toggle, setToggle] = useState(false);
  const { user } = useAuth();

  return (
    <div
      type="button"
      id="menu-button"
      aria-expanded="true"
      aria-haspopup="true"
      className="relative"
    >
      <button
        id="btn"
        onClick={() => setToggle(t => !t)}
        className="aspect-square cursor-pointer rounded-full p-3 hover:bg-gray-50 font-medium group"
      >
        <IoEllipsisVertical className="text-responsive" />
      </button>
      <div
        className={`absolute right-0 rounded-md shadow-lg bg-gray-50 ring-1 ring-black ring-opacity-5 opacity-0  ${
          toggle ? 'opacity-100' : ''
        } duration-300`}
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        {user?.id === authorId ? (
          <div id="choice" className="py-1" role="none">
            <button
              className="block px-4 py-2 smaller-text-responsive min-w-max bg-gray-50 hover:bg-zinc-300"
              tabIndex="-1"
            >
              Chỉnh Sửa
            </button>
          </div>
        ) : null}
        <div id="choice" className="py-1" role="none">
          <button
            className="w-full px-4 py-2 smaller-text-responsive min-w-max bg-gray-50 hover:bg-zinc-300 "
            tabIndex="-1"
          >
            Báo Cáo
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordDropDown;
