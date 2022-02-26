import { approvePendingWord, rejectPendingWord } from '@lib/db';
import Link from 'next/link';
import { useState } from 'react';
import {
  IoHeartOutline,
  IoHeart,
  IoShareOutline,
  IoFlagOutline,
  IoCheckmarkSharp,
  IoCloseSharp,
} from 'react-icons/io5';

const WordDetail = ({ word, pending }) => {
  const [like, setLike] = useState(false);
  const [display, setDisplay] = useState(true);

  return display ? (
    <div className="h-full my-border flex flex-center flex-col p-4 gap-2 font-mono">
      <div className="flex gap-2 self-start">
        {word.tags.map(tag => (
          <Link key={tag} href="/" passHref>
            <a className="rounded-3xl smaller-text-responsive p-3 bg-blue-400 text-center">
              {tag}
            </a>
          </Link>
        ))}
      </div>

      <h1 className="bigger-text-responsive uppercase font-bold font-ole text-center p-2">
        {word.word}
      </h1>

      <div className="text-responsive grid grid-cols-12 gap-4 items-baseline">
        <p className="font-black col-span-2 justify-self-center">Định Nghĩa:</p>

        <p className="col-span-10 align-baseline p-2 max-w-[65ch]">
          {word.definition}
        </p>

        <p className="font-black col-span-2 justify-self-center">Ví Dụ:</p>
        <p className="col-span-10 relative p-2 max-w-[65ch]">{word.example}</p>
      </div>

      <Link href="/">
        <a className="text-responsive px-4 py-2 font-bold self-end uppercase ">
          {word.author}
        </a>
      </Link>

      {pending ? (
        <Approval
          id={word.id}
          userWordRef={word.userWordRef}
          setDisplay={setDisplay}
        />
      ) : (
        <Reaction like={like} />
      )}
    </div>
  ) : null;
};

const Reaction = ({ like }) => (
  <div className="flex gap-10">
    <button
      className="word-button text-responsive active:animate-ping"
      onClick={() => {
        setLike(!like);
      }}
    >
      {like ? (
        <IoHeartOutline className="bigger-text-responsive" />
      ) : (
        <IoHeart className="bigger-text-responsive text-red-500" />
      )}
      <p className="text-2xl font-medium">1000</p>
    </button>

    <button className="word-button active:scale-75 duration-700">
      <IoShareOutline className="bigger-text-responsive" />
      <p className="text-2xl font-medium">Chia Sẽ</p>
    </button>

    <button className="word-button active:scale-75 duration-700 ml-auto">
      <IoFlagOutline className="bigger-text-responsive" />
      <p className="text-2xl font-medium">Báo Cáo</p>
    </button>
  </div>
);

const Approval = ({ id, userWordRef, setDisplay }) => {
  return (
    <div className="flex gap-14">
      <button
        onClick={() => {
          rejectPendingWord(id, userWordRef);
          setDisplay(false);
        }}
        className="word-button active:scale-75 duration-700"
      >
        <IoCloseSharp className="bigger-text-responsive" />
        <p className="text-2xl font-medium">Xóa Bài</p>
      </button>

      <button
        onClick={() => {
          approvePendingWord(id, userWordRef);
          setDisplay(false);
        }}
        className="word-button active:scale-75 duration-700 ml-auto"
      >
        <IoCheckmarkSharp className="bigger-text-responsive" />
        <p className="text-2xl font-medium">Duyệt Bài</p>
      </button>
    </div>
  );
};

export default WordDetail;
