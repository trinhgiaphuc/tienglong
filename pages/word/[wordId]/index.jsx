// import WordDetailList from '@components/word/WordDetailList';
import SectionWord from '@components/word/SectionWords';
import Title from '@components/word/Title';
import WordDetail from '@components/word/WordDetail';
import fetcher from '@lib/fetcher';
// import { useAuth } from '@lib/userContext';
// import { useState, useEffect } from 'react';

// TODO: BIG DAY TOMORROW, REFACTOR TO ISR
export default function Word({ wordDetails = [] }) {
  // const { user } = useAuth();
  // const [relatedWords, setRelatedWords] = useState([]);
  // useEffect(() => {
  //   if (user) {}
  //   return () => {};
  // }, [user]);

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

export async function getStaticProps(ctx) {
  let { wordId } = ctx.params;
  try {
    const wordDetails = await fetcher(`word/${wordId}`);
    return { props: { wordDetails }, revalidate: 150 };
  } catch (error) {
    console.error(error);
    return { props: { wordDetails: [] } };
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { wordId: 'BVAKKBTmMeLFdDEEdX8o' } }],
    fallback: 'blocking',
  };
}
