import * as React from 'react';
import { useRouter } from 'next/router';
import Title from '@components/word/Title';
import AddWordForm from '@components/word/AddWordForm';
import fetcher from '@lib/fetcher';

const EditWordPage = () => {
  const router = useRouter();
  const { wordId } = router.query;
  const [word, setWord] = React.useState({});

  React.useEffect(() => {
    fetcher(`word/${wordId}`).then(setWord);
  }, [wordId]);

  return (
    <div className="">
      <div className="py-5 bg-black flex-center">
        <Title color="white">Chỉnh Sửa Từ</Title>
      </div>
      <AddWordForm
        formType="edit"
        word={word.word}
        definition={word.definition}
        example={word.example}
      />
    </div>
  );
};

export default EditWordPage;
