import Link from 'next/link';
import WordDropDown from './WordDropDown';

const WordCard = ({ word }) => {
  const { createdAt, id, tags, definition, author, authorId } = word;

  return (
    <div className="m-auto my-border relative h-full w-full p-2  prose-a:no-underline  font-mono flex flex-col ">
      <div className="flex items-start mr-10">
        <div className="md:flex-grow  flex flex-wrap gap-2 sm:justify-start sm:p-2">
          <Link href="/" passHref>
            <p className="rounded-3xl prose px-2 bg-orange-400 text-center">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </Link>

          {tags.map(tag => (
            <Link key={tag} href="/" passHref>
              <a className="rounded-3xl prose px-2 bg-blue-400 text-center">
                {tag}
              </a>
            </Link>
          ))}
        </div>
      </div>

      <article className="m-auto prose prose-h2:text-4xl prose-h2:m-0 prose-p:text-xl flex flex-col">
        <Link href={`/word/${id}`} passHref>
          <a className="cursor-pointer">
            <h2 className=" font-bold font-ole text-center">{word.word}</h2>
          </a>
        </Link>
        <Link href={`/word/${id}`} passHref>
          <a className="cursor-pointer">
            <p className="text-black p-2 text-justify text-ellipsis">
              {definition}
            </p>
          </a>
        </Link>

        <Link href={`/user/${authorId}`} passHref>
          <p className="self-end font-bold  uppercase cursor-pointer">
            {author}
          </p>
        </Link>
      </article>
      <WordDropDown authorId={authorId} />
    </div>
  );
};

export default WordCard;
