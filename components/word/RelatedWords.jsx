import WordDetail from './WordDetail';

const RelatedWord = ({ pendingWords }) => {
  return (
    <div className="my-border">
      {pendingWords.map(word => (
        <WordDetail key={word.id} word={word} pending={true} />
      ))}
    </div>
  );
};

export default RelatedWord;
