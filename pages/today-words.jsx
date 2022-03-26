import SectionWord from '@components/word/SectionWords';
import WordList from '@components/word/WordList';
import { getTodayWords } from '@lib/firebase-admin';

export default function TodayWordPage({ todayWords }) {
  return (
    <div className="h-screen">
      <SectionWord section="Từ Hôm Nay" words={todayWords} />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const todayWords = await getTodayWords();
  return { props: { todayWords } };
}
