import Link from 'next/link';
import {
  ApproveButton,
  RejectButton,
  ReportButton,
  ShareButton,
  HeartButton,
} from '@components/buttons';

import { useState } from 'react';
import WordDropDown from './WordDropDown';

const WordDetail = ({ wordDetails, wordIsPending }) => {
  const {
    createdAt,
    tags,
    word,
    definition,
    example,
    author,
    heartCount,
    id,
    authorId,
  } = wordDetails;

  const [hideWord, setHideWord] = useState(false);

  return hideWord ? null : (
    <div className="my-border h-full flex-center flex-col p-4 gap-2 font-mono">
      <div className="w-full flex items-start">
        <div className="flex-grow flex gap-2 self-start flex-wrap">
          <Link href="/" passHref>
            <a className="my-1 sm:my-0 rounded-3xl smaller-text-responsive p-3 bg-orange-400 text-center">
              {new Date(createdAt).toLocaleDateString()}
            </a>
          </Link>

          {tags.map(tag => (
            <Link key={tag} href="/" passHref>
              <a className="my-1 sm:my-0 rounded-3xl smaller-text-responsive p-3 bg-blue-400 text-center">
                {tag}
              </a>
            </Link>
          ))}
        </div>

        <WordDropDown authorId={authorId} />
      </div>

      <h1 className="bigger-text-responsive uppercase font-bold font-ole text-center p-2">
        {word}
      </h1>

      <div className="prose text-responsive grid grid-cols-12 gap-4 items-baseline">
        <p className="font-black col-span-3 ms:col-span-2 justify-self-center text-center">
          Định Nghĩa:
        </p>
        <p className="col-span-9 ms:col-span-10 p-2 max-w-[65ch]">
          {definition}
        </p>

        <p className="font-black col-span-3 ms:col-span-2 justify-self-center text-center">
          Ví Dụ:
        </p>
        <p className="col-span-9 ms:col-span-10 p-2 max-w-[65ch]">{example}</p>
      </div>

      <Link href={`/user/${authorId}`}>
        <a className="text-responsive px-4 py-2 font-bold self-end uppercase ">
          {author}
        </a>
      </Link>

      {wordIsPending ? (
        <div className="flex gap-14">
          <RejectButton id={id} authorId={authorId} setHideWord={setHideWord} />
          <ApproveButton wordDetails={wordDetails} setHideWord={setHideWord} />
        </div>
      ) : (
        <div className="flex gap-10">
          <HeartButton
            heartCount={heartCount}
            authorId={authorId}
            wordId={id}
          />
          <ShareButton />
          <ReportButton />
        </div>
      )}
    </div>
  );
};

export default WordDetail;
