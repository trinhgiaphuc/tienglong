import { rejectPendingWord } from '@lib/db';
import { IoCloseSharp } from 'react-icons/io5';

const RejectButton = ({ setHideWord, id, authorId }) => {
  return (
    <button
      onClick={() => {
        rejectPendingWord(id, authorId);
        setHideWord(true);
      }}
      className="word-button active:scale-75 duration-700 "
    >
      <IoCloseSharp className="bigger-text-responsive" />
      <p className="text-2xl font-medium">Xóa Bài</p>
    </button>
  );
};

export default RejectButton;
