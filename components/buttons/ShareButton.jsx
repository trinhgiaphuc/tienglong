import * as React from 'react';
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import { IoShareSocialOutline } from 'react-icons/io5';

const ShareButton = ({wordId}) => {
  const [openShare, setOpenShare] = React.useState(false);
  return (
    <div className="active:scale-75 duration-700 word-button relative">
      <button className='flex items-center' onClick={() => setOpenShare(p => !p)}>
        <IoShareSocialOutline className="prose prose-2xl text-black" />
        <p className="prose prose-sm lg:prose-lg text-black xl:prose-xl font-medium hidden sm:block">
          Chia Sẽ
        </p>
      </button>

      {openShare ?
        <div className="flex gap-2 absolute bottom-full left-0">
          <FacebookShareButton url={`https://tienglong.vercel.app/word/${wordId}`}>
            <FacebookIcon className="h-10 w-10 rounded-full" />
          </FacebookShareButton>
          <TwitterShareButton url={`https://tienglong.vercel.app/word/${wordId}`}>
            <TwitterIcon className="h-10 w-10 rounded-full" />
          </TwitterShareButton>
        </div>
        : null}
    </div>
  );
};

export default ShareButton;
