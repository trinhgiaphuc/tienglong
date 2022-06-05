import Title from '@components/word/Title';
import WordDetailList from '@components/word/WordDetailList';
import fetcher from '@lib/fetcher';

export default function TodayWordPage({ words }) {
  const { todayWords } = words;

  return (
    <div className="h-screen">
      <div className="border-4 border-black flex items-center justify-center p-10">
        <Title>Từ Của Hôm Nay</Title>
      </div>
      <div className="w-full md:w-3/4 mx-auto -mt-1">
        <WordDetailList isPending={false} words={todayWords} />
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=300'
  );

  let words = await fetcher('word/today-words');
  return { props: { words } };
}
