import { IoEllipsisVertical } from 'react-icons/io5';
import { useState } from 'react';
import { useAuth } from '@lib/userContext';
import { useEffect } from 'react';

const WordDropDown = ({ authorId }) => {
  const [toggle, setToggle] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!toggle) return;
    document.body.addEventListener('click', handleToggle);
    return () => document.body.removeEventListener('click', handleToggle);
  }, [toggle]);

  const handleToggle = e => {
    e.stopPropagation();
    setToggle(t => !t);
  };

  return (
    <button
      type="button"
      id="menu-button"
      aria-expanded="true"
      aria-haspopup="true"
      className="absolute top-0 right-0 p-2 bg-transparent outline-none"
    >
      <button
        onClick={handleToggle}
        className=" aspect-square cursor-pointer bg-transparent outline-none rounded-full p-2 hover:bg-gray-50 font-medium group"
      >
        <IoEllipsisVertical className="prose prose-lg md:prose-xl lg:prose-2xl outline-none" />
      </button>
      <ul
        className={`absolute right-0 rounded-md shadow-lg bg-gray-50 ring-1 ring-black ring-opacity-5 opacity-0 scale-0  ${
          toggle ? 'opacity-100 scale-100' : ''
        } duration-150`}
        tabIndex="-1"
      >
        {user?.id === authorId ? (
          <li id="choice" className="py-1" role="none">
            <button
              className="block px-4 py-2 prose min-w-max bg-gray-50 hover:bg-zinc-300"
              tabIndex="-1"
            >
              Chỉnh Sửa
            </button>
          </li>
        ) : null}
        <div id="choice" className="py-1" role="none">
          <button
            className="w-full px-4 py-2 prose min-w-max bg-gray-50 hover:bg-zinc-300 "
            tabIndex="-1"
          >
            Báo Cáo
          </button>
        </div>
      </ul>
    </button>
  );
};

export default WordDropDown;
