import { useState, useEffect } from 'react';
import Link from 'next/link';

import { IoSearch } from 'react-icons/io5';

const SearchBar = () => {
  const [wordList, setWordList] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const param = new URLSearchParams({ q: query });

    let timer;
    if (query.length > 2) {
      timer = setTimeout(async () => {
        try {
          const res = await fetch(`/api/redis/search-word?${param}`);
          const words = await res.json();
          setWordList(words);
        } catch (error) {
          console.error(error);
        }
      }, 300);
    }

    return () => clearTimeout(timer || 0);
  }, [query]);

  async function handleClick() {
    setWordList([]);
    await fetch('/api/redis/disconnect');
  }

  return (
    <div className="navbar__item relative bg-white px-4 flex-grow">
      <input
        className="navbar__item-text w-full prose lg:prose-xl xl:prose-2xl h-full outline-none"
        placeholder="TÌM KIẾM"
        onChange={e => {
          setQuery(e.target.value);
        }}
        value={query}
      />
      <IoSearch className="prose lg:prose-xl xl:prose-2xl hidden sm:block" />

      <ul className="absolute top-full left-0 w-full bg-slate-100">
        {wordList.map(({ author, content, word, wordId }) => {
          return (
            <Link key={wordId} href={`/word/${wordId}`} passHref>
              <li
                onClick={handleClick}
                className="flex justify-center flex-col px-4 py-2 cursor-pointer hover:bg-green-300"
              >
                <div className="flex items-center w-full">
                  <h1 className="flex-grow prose-xl font-medium">{word}</h1>
                  <p className="prose-xl font-medium">{author}</p>
                </div>
                <p className="text-zinc-600">{content.substring(0, 30)}...</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchBar;
