import WordDetail from './WordDetail';

// TODO: DELETE THAT SHIT
const WordDetailList = ({ words }) => {
  return (
    <div className="my-border">
      {words?.map(wordDetails => (
        <WordDetail
          key={wordDetails.id}
          wordDetails={wordDetails}
          wordIsPending={true}
        />
      ))}
    </div>
  );
};

export default WordDetailList;
