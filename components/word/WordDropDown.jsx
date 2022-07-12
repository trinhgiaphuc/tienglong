import { IoEllipsisVertical } from 'react-icons/io5';
import { useState, useCallback } from 'react';
import { useEffect } from 'react';
import Link from 'next/link';

const WordDropDown = ({ wordId, authorId }) => {
  const [isShown, setIsShown] = useState(false);

  const handleTurnOffDropDown = useCallback(e => {
    if (e.key === 'Escape') {
      setIsShown(false);
    }
  }, []);

  useEffect(() => {
    if (!isShown) return;
    document.body.addEventListener('click', handleToggle);
    document.addEventListener('keydown', handleTurnOffDropDown);

    return () => {
      document.body.removeEventListener('click', handleToggle);
      document.removeEventListener('keydown', handleTurnOffDropDown);
    };
  }, [handleTurnOffDropDown, isShown]);

  const handleToggle = e => {
    e.stopPropagation();
    setIsShown(t => !t);
  };

  return (
    <button
      data-testid="toggle-dropdown-btn"
      type="button"
      aria-expanded="true"
      aria-haspopup="true"
      className="absolute top-0 right-0 pt-2 pr-2 pb-1 pl-1 bg-transparent outline-none"
      onClick={handleToggle}
    >
      <IoEllipsisVertical className="prose prose-2xl outline-none aspect-square rounded-full  hover:bg-gray-50 font-medium" />
      <div
        className={`absolute top-full right-3/4 min-w-max rounded-md shadow-sm border overflow-hidden bg-gray-100 opacity-0 scale-0 duration-150  ${
          isShown ? 'opacity-100 scale-100' : ''
        }`}
        tabIndex="-1"
      >
        <Link href="/">
          <a
            data-testid="report-dropdown"
            className="p-2 block text-xs md:text-sm lg:text-lg min-w-max bg-gray-100 hover:bg-zinc-300 "
            tabIndex="-1"
          >
            Báo Cáo
          </a>
        </Link>
      </div>
    </button>
  );
};

export default WordDropDown;
