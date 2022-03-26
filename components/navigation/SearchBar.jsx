import fetcher from '@lib/fetcher';
import { useState, useEffect } from 'react';

import { IoSearch } from 'react-icons/io5';

const SearchBar = () => {
  const [wordList, setWordList] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const param = new URLSearchParams({ q: query });

    let timer;
    if (query.length > 2) {
      timer = setTimeout(async () => {
        console.log('working');
        try {
          const res = await fetch(`/api/redis/search-word?${param}`);
          const words = await res.json();
          console.log(words);
        } catch (error) {
          console.log(error);
        }
        // setWordList(words);
      }, 500);
    }

    return () => clearTimeout(timer || 0);
  }, [query]);

  return (
    <div className="navbar__item bg-white px-4 flex-grow">
      <input
        onFocus={async () => await fetcher('redis/create-index')}
        className="navbar__item-text w-full prose lg:prose-xl xl:prose-2xl h-full outline-none"
        placeholder="TÌM KIẾM"
        onChange={e => setQuery(e.target.value)}
        value={query}
      />
      <IoSearch className="prose lg:prose-xl xl:prose-2xl hidden sm:block" />
    </div>
  );
};

export default SearchBar;
