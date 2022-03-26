import Link from 'next/link';
import Footer from '@components/layouts/Footer';
import Hero from '@components/layouts/Hero';
import SectionWord from '@components/word/SectionWords';
import Title from '@components/word/Title';
import { Fragment } from 'react';

import { getTodayWords, getTrendingWords } from '@lib/firebase-admin';
import Layout from '@components/layouts/Layout';

const DefineBanner = () => (
  <Fragment>
    <div className="my-border group flex-center bg-black p-2 text-white">
      <Title color="white">Hôm nay bạn sẽ định nghĩa gì?</Title>
    </div>

    <div className="my-border prose-a:text-xs group flex-center bg-black text-white py-3">
      <Link href="/define" passHref>
        <button className="hover:scale-[1.02] pb-4 transition-all active:scale-100">
          <span className="underline p-2 rounded-sm bg-white text-black">
            Đến Mục Định nghĩa
          </span>
          &rarr;
        </button>
      </Link>
    </div>
  </Fragment>
);

export default function Home({ todayWords, trendingWords }) {
  return (
    <Layout title="Tiếng Lòng" description="Từ Điển Tiếng Lóng">
      <Hero />

      <main className="my-border text-zinc-800">
        <SectionWord
          section="từ hôm nay"
          href="/today-words"
          words={todayWords}
        />
        <DefineBanner />
        <SectionWord
          section="từ đang thịnh hành"
          href="/trending-words"
          words={trendingWords}
        />
      </main>

      <Footer />
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  // FIXME: fix cookies
  try {
    const todayWords = await getTodayWords();
    const trendingWords = await getTrendingWords();
    return { props: { todayWords, trendingWords } };
  } catch (error) {
    console.log(error);
  }

  return { props: {} };
}
