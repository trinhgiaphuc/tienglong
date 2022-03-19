import { IoEllipsisVertical } from 'react-icons/io5';
import { useState } from 'react';

const WordDropDown = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div
      type="button"
      id="menu-button"
      aria-expanded="true"
      aria-haspopup="true"
      className="relative"
    >
      <button
        onClick={() => setToggle(t => !t)}
        className="aspect-square cursor-pointer rounded-full p-3 hover:bg-gray-50 font-medium group"
      >
        <IoEllipsisVertical className="text-responsive" />
      </button>

      <div
        className={`absolute right-0 rounded-md shadow-lg bg-gray-50 hover:bg-zinc-300 ring-1 ring-black ring-opacity-5 opacity-0 ${
          toggle ? 'opacity-100' : ''
        } duration-300`}
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        <div id="choice" className="py-1" role="none">
          <button
            className="block px-4 py-2 smaller-text-responsive min-w-max"
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
