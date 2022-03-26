import { approvePendingWord } from '@lib/db';
import fetcher from '@lib/fetcher';
import { IoCheckmarkSharp } from 'react-icons/io5';

const ApproveButton = ({ setHideWord, wordDetails }) => {
  const { word, author, definition: content, id: wordId } = wordDetails;

  return (
    <button
      onClick={() => {
        Promise.all([
          approvePendingWord(wordDetails),
          fetcher('redis/add-word', { word, author, content, wordId }),
        ])
          .then(() => {
            setHideWord(true);
          })
          .catch(console.log);
      }}
      className="word-button active:scale-75 duration-700 mx-2 lg:mx-0"
    >
      <IoCheckmarkSharp className="bigger-text-responsive" />
      <p className="text-2xl font-medium">Duyệt Bài</p>
    </button>
  );
};

export default ApproveButton;
