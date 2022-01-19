import Link from 'next/link';

const WordCard = ({ word }) => {
  return (
    <article className="px-8 py-4 h-full tracking-wide font-mono flex flex-col gap-5 justify-around">
      <div className="flex flex-wrap gap-2 sm:p-2">
        <Link href="/" passHref>
          <a className="rounded-3xl px-4 py-2 bg-orange-400 text-center">
            {new Date().toLocaleDateString()}
          </a>
        </Link>

        <Link href="/" passHref>
          <a className="rounded-3xl px-4 py-2 bg-blue-400 text-center">TAG</a>
        </Link>
      </div>

      <h1 className="text-4xl font-bold font-ole text-center">Nóc nhà</h1>
      <p className="text-black text-[2ch] line-clamp-3 text-ellipsis">{word}</p>

      <Link href="/" passHref>
        <p className="self-end font-bold text-responsive uppercase cursor-pointer">
          Chin Fon
        </p>
      </Link>
    </article>
  );
};

export default WordCard;
