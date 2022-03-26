import WordCard from './WordCard';

const WordList = ({ nogrid, words }) => {
  let className = '';

  return (
    <ul className={`my-border flex flex-col ${nogrid ? '' : 'card-list'}`}>
      {words?.map((word, i) => {
        if (i === 0) className = 'col-span-5 row-span-2 hover:bg-red-300';
        if (i === 1) className = 'col-span-4 row-span-2 hover:bg-green-300';
        if (i === 2) className = 'col-span-3 row-span-2 hover:bg-blue-300';
        if (i === 3) className = 'col-span-3 row-span-2 hover:bg-blue-300';
        if (i === 4) className = 'col-span-4 row-span-2 hover:bg-red-300';
        if (i === 5) className = 'col-span-5 row-span-2 hover:bg-green-300';
        if (i === 6) className = 'col-span-4 row-span-2 hover:bg-green-300';
        if (i === 7) className = 'col-span-4 row-span-2 hover:bg-blue-300';
        if (i === 8) className = 'col-span-4 row-span-2 hover:bg-red-300';
        return (
          <li className={`my-border ${className}`} key={i}>
            <WordCard word={word} />
          </li>
        );
      })}
    </ul>
  );
};

export default WordList;
