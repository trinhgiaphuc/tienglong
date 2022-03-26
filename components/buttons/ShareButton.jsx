import { IoShareSocialOutline } from 'react-icons/io5';

const ShareButton = () => {
  return (
    <button className="active:scale-75 duration-700 mx-2 lg:mx-0">
      <div className="word-button h-full">
        <IoShareSocialOutline className="prose prose-2xl text-black" />
        <p className="prose prose-sm lg:prose-lg text-black xl:prose-xl font-medium hidden sm:block">
          Chia Sẽ
        </p>
      </div>
    </button>
  );
};

export default ShareButton;
