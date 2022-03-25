import { IoShareSocialOutline } from 'react-icons/io5';

const ShareButton = () => {
  return (
    <button className="word-button active:scale-75 duration-700">
      <IoShareSocialOutline className="prose prose-2xl text-black" />
      <p className="prose prose-sm lg:prose-lg text-black xl:prose-xl font-medium hidden sm:block">
        Chia Sẽ
      </p>
    </button>
  );
};

export default ShareButton;
