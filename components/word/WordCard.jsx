import Link from 'next/link';
import WordDropDown from './WordDropDown';

const WordCard = ({ word }) => {
  const { createdAt, id, tags, definition, author, authorId } = word;

  return (
    <div className="m-auto my-border relative h-full w-full p-2 prose-a:no-underline font-ole flex flex-col ">
      <article className="mx-auto prose prose-h2:text-4xl prose-h2:m-4 prose-p:text-xl flex flex-col">
        <div className="md:flex-grow mr-10 flex flex-wrap gap-2 sm:justify-start sm:p-2">
          <Link href="/" passHref>
            <a className="rounded-3xl prose px-2 my-1 sm:my-0 bg-orange-400 text-center">
              {new Date(createdAt).toLocaleDateString()}
            </a>
          </Link>

          {tags.map(tag => (
            <Link key={tag} href="/" passHref>
              <a className="rounded-3xl prose px-2 my-1 sm:my-0 bg-blue-400 text-center">
                {tag}
              </a>
            </Link>
          ))}
        </div>

        <Link href={`/word/${id}`} passHref>
          <a className="cursor-pointer">
            <h2 className="prose font-bold text-center">{word.word}</h2>
          </a>
        </Link>
        <Link href={`/word/${id}`} passHref>
          <a className="prose cursor-pointer">
            <p className="text-black line-clamp-4 px-2 sm:p-0">{definition}</p>
          </a>
        </Link>

        <Link href={`/user/${authorId}`} passHref>
          <p className="self-end font-bold  uppercase cursor-pointer">
            {author}
          </p>
        </Link>
      </article>
      <WordDropDown wordId={id} authorId={authorId} />
    </div>
  );
};

export default WordCard;
