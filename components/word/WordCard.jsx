import Link from 'next/link';
import WordDropDown from './WordDropDown';

const WordCard = ({ word }) => {
  const { createdAt, id, tags, definition, author, authorId } = word;

  return (
    <div className="p-4 h-full tracking-wide font-mono flex flex-col gap-5">
      <span className="flex items-start">
        <div className="md:flex-grow flex flex-wrap gap-2 justify-center sm:justify-start sm:p-2">
          <Link href="/" passHref>
            <a className="rounded-3xl text-xs ms:smaller-text-responsive p-4 bg-orange-400 text-center">
              {new Date(createdAt).toLocaleDateString()}
            </a>
          </Link>

          {tags.map(tag => (
            <Link key={tag} href="/" passHref>
              <a className="rounded-3xl text-xs ms:smaller-text-responsive p-4 bg-blue-400 text-center">
                {tag}
              </a>
            </Link>
          ))}
        </div>
        <WordDropDown authorId={authorId} />
      </span>

      <article className="flex-grow flex flex-col justify-evenly">
        <Link href={`/word/${id}`} passHref>
          <a className="cursor-pointer">
            <h1 className="bigger-text-responsive font-bold font-ole text-center">
              {word.word}
            </h1>
            <p className="prose text-black p-2 text-responsive text-justify text-ellipsis">
              {definition}
            </p>
          </a>
        </Link>

        <Link href={`/user/${authorId}`} passHref>
          <p className="self-end font-bold smaller-text-responsive uppercase cursor-pointer">
            {author}
          </p>
        </Link>
      </article>
    </div>
  );
};

export default WordCard;
