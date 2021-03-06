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
    <main className="my-border relative h-full flex-center flex-col p-4 gap-2 font-ole">
      <div className="px-2 w-full flex flex-wrap items-start mb-5 mr-8">
        <div className="flex-grow flex gap-2 self-start flex-wrap ">
          {tags?.map(tag => (
            <Link key={tag} href="/" passHref>
              <a className="other-tags">{tag}</a>
            </Link>
          ))}
        </div>
      </div>

      <div className="prose-lg prose-h1:mb-5">
        <h2 className="text-2xl sm:text-3xl text-black  leading-snug uppercase font-bold font-ole text-center p-2">
          {word}
        </h2>

        <div className="prose mx-auto items-baseline">
          <div className="prose text-black">
            <h4 className="font-black text-black prose justify-self-center text-center">
              Định Nghĩa:
            </h4>
            <p className="text-center prose:sm sm:prose-xl">{definition}</p>
          </div>

          <hr className="w-3/4 my-0 border-black mx-auto" />

          <div className="prose prose-p:mb-0 text-black">
            <h4 className="font-black text-black justify-self-center text-center">
              Ví Dụ:
            </h4>
            <p className="text-center prose:sm sm:prose-xl">{example}</p>
          </div>
        </div>
      </div>

      <Link href={`/user/${authorId}`}>
        <a className="prose text-black px-4 py-2 font-bold self-end uppercase ">
          {author}
        </a>
      </Link>

      {wordIsPending ? (
        <div className="flex gap-14">
          <RejectButton id={id} authorId={authorId} setHideWord={setHideWord} />
          <ApproveButton wordDetails={wordDetails} setHideWord={setHideWord} />
        </div>
      ) : (
        <div className="grid grid-cols-3 h-16 gap-5 sm:gap-10">
          <HeartButton
            heartCount={heartCount}
            authorId={authorId}
            wordId={id}
          />
          <ShareButton wordId={id} />
          <ReportButton wordId={id} />
        </div>
      )}

      <WordDropDown wordId={id} authorId={authorId} />
    </main>
  );
};

export default WordDetail;
