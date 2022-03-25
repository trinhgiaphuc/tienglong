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
      className="absolute top-0 right-0 pt-2 pr-2 pb-1 pl-1 bg-transparent outline-none"
      onClick={handleToggle}
    >
      <IoEllipsisVertical className="prose prose-2xl outline-none aspect-square rounded-full  hover:bg-gray-50 font-medium" />
      <div
        className={`absolute top-full right-3/4 rounded-md shadow-lg overflow-hidden bg-gray-100 ring-1 ring-black ring-opacity-5 opacity-0 scale-0 duration-150  ${
          toggle ? 'opacity-100 scale-100' : ''
        }`}
        tabIndex="-1"
      >
        {user?.id === authorId ? (
          <div id="choice" className="" role="none">
            <a
              className="p-2 block  prose min-w-max bg-gray-100 hover:bg-zinc-300"
              tabIndex="-1"
            >
              Chỉnh Sửa
            </a>
          </div>
        ) : null}
        <div id="choice" className="" role="none">
          <a
            className="p-2 block prose min-w-max bg-gray-100 hover:bg-zinc-300 "
            tabIndex="-1"
          >
            Báo Cáo
          </a>
        </div>
      </div>
    </button>
  );
};

export default WordDropDown;
