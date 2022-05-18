import WordDetail from './WordDetail';

// TODO: DELETE THAT SHIT
const WordDetailList = ({ words, isPending = true }) => {
  return (
    <div className="my-border">
      {words?.map(wordDetails => (
        <WordDetail
          key={wordDetails.id}
          wordDetails={wordDetails}
          wordIsPending={isPending}
        />
      ))}
    </div>
  );
};

export default WordDetailList;
