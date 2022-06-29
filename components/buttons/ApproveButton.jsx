import { approvePendingWord } from "@lib/db";
import { IoCheckmarkSharp } from "react-icons/io5";

const ApproveButton = ({ setHideWord, wordDetails }) => {
  return (
    <button
      onClick={async () => {
        try {
          await approvePendingWord(wordDetails);
        } catch (error) {
          console.log("FUCKEDUP");
          console.error(error);
        }
        setHideWord(true);
      }}
      className="word-button active:scale-75 duration-700 mx-2 lg:mx-0"
    >
      <IoCheckmarkSharp className="bigger-text-responsive" />
      <p className="text-xl font-medium">Duyệt Bài</p>
    </button>
  );
};

export default ApproveButton;
