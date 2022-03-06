import Link from 'next/link';

const WordCard = ({ word }) => {
  const { createdAt, id, tags, definition, author, authorId } = word;

  return (
    <article className="px-8 py-4 h-full tracking-wide font-mono flex flex-col gap-5 justify-around">
      <div className="flex flex-wrap gap-2 sm:p-2">
        <Link href="/" passHref>
          <a className="rounded-3xl smaller-text-responsive p-3 bg-orange-400 text-center">
            {new Date(createdAt).toLocaleDateString()}
          </a>
        </Link>

        {tags.map(tag => (
          <Link key={tag} href="/" passHref>
            <a className="rounded-3xl smaller-text-responsive p-3 bg-blue-400 text-center">
              {tag}
            </a>
          </Link>
        ))}
      </div>

      <Link href={`/word/${id}`} passHref>
        <a className="cursor-pointer">
          <h1 className="text-4xl font-bold font-ole text-center">
            {word.word}
          </h1>
          <p className="text-black p-2 text-[2ch] line-clamp-3 text-ellipsis">
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
  );
};

export default WordCard;
