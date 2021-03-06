import * as React from 'react';

import Link from 'next/link';
import Footer from '@components/layouts/Footer';
import Hero from '@components/layouts/Hero';
import SectionWord from '@components/word/SectionWords';
import Title from '@components/word/Title';
import Layout from '@components/layouts/Layout';
import fetcher from '@lib/fetcher';
import Modal from '@components/commons/Modal';

export default function Home({ todayWords = [], trendingWords = [] }) {

  return (
    <Layout title="Tiếng Lòng" description="Từ Điển Tiếng Lóng">
      <Hero />

      <main className="my-border text-zinc-800">
        <SectionWord
          section="từ của hôm nay"
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
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=60'
  );

  const { todayWords } = await fetcher('word/today-words');
  const { trendingWords } = await fetcher('word/trending-words');

  return { props: { todayWords, trendingWords } };
}

const DefineBanner = () => (
  <React.Fragment>
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
  </React.Fragment>
);
