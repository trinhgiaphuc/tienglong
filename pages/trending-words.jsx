import { getTrendingWords } from '@lib/firebase-admin';

// import SectionWord from '@components/word/SectionWords';

export default function TrendingWords({}) {
  return <div className="h-screen"></div>;
}

export async function getServerSideProps(ctx) {
  const words = await getTrendingWords();
  return { props: {} };
}
