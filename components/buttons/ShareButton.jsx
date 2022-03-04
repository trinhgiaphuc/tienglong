const { IoShareOutline } = require('react-icons/io5');

const ShareButton = () => {
  return (
    <button className="word-button active:scale-75 duration-700">
      <IoShareOutline className="bigger-text-responsive" />
      <p className="text-2xl font-medium">Chia Sẽ</p>
    </button>
  );
};

export default ShareButton;
