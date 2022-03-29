// import WordDetailList from '@components/word/WordDetailList';
import SectionWord from '@components/word/SectionWords';
import Title from '@components/word/Title';
import WordDetail from '@components/word/WordDetail';
import { getWordsByTagClient } from '@lib/db';
import { getSpecificWordServer } from '@lib/firebase-admin';
import { useAuth } from '@lib/userContext';
import { useState, useEffect } from 'react';

export async function getServerSideProps(ctx) {
  const { wordId } = ctx.query;

  try {
    const wordDetails = await getSpecificWordServer(wordId);

    return { props: { wordDetails } };
  } catch (error) {
    console.log(error);
  }
}

export default function Word({ wordDetails = [] }) {
  const { user } = useAuth();

  const [relatedWords, setRelatedWords] = useState([]);

  useEffect(() => {
    if (user) {
      // getWordsByTagClient('')
    }
    return () => {};
  }, [user]);

  return (
    <div className="my-border lg:p-2  flex flex-col">
      <div className="w-full lg:w-3/4 mx-auto">
        <div className="my-border group flex-center bg-black py-10 text-white">
          <Title color="white">Chi Tiết Từ</Title>
        </div>
        <WordDetail wordDetails={wordDetails} />
        <div className="my-border group flex-center bg-black py-10 text-white">
          <Title color="white">những từ có cùng Tag</Title>
        </div>
        {/* <WordDetailList /> */}
      </div>
    </div>
  );
}
