import Footer from '@components/layouts/Footer';
import Hero from '@components/layouts/Hero';
import Link from 'next/link';
import Metatags from '@components/utils/Metatags';
import SectionWord from '@components/word/SectionWords';
import { getInitialWords } from '@lib/firebase-admin';
import Title from '@components/word/Title';

export async function getServerSideProps({ req, res }) {
  try {
    const words = await getInitialWords();
    return { props: { words } };
  } catch (error) {
    console.log(error);
  }

  return { props: {} };
}

export default function Home({ words }) {
  return (
    <div>
      <Metatags title="Home Page" />
      <Hero />

      <main className="my-border text-zinc-800">
        <SectionWord section="từ hôm nay" href="/today-words" words={words} />
        <DefineBanner />
        <SectionWord
          section="từ đang thịnh hành"
          href="/trending-words"
          words={words}
        />

        <div className="my-border group flex-center bg-black py-10 text-white">
          <h1 className="title-responsive px-4 text-center uppercase">
            spacing
          </h1>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const DefineBanner = () => (
  <div>
    <div className="my-border group flex-center bg-black p-2 text-white">
      <Title color="white">Hôm nay bạn sẽ định nghĩa gì?</Title>
    </div>

    <div className="my-border group flex-center bg-black text-white py-3">
      <Link href="/define" passHref>
        <button className="text-responsive hover:scale-[1.02] pb-4 transition-all active:scale-100">
          <span className="underline p-2 rounded-sm bg-white text-black">
            Đến Mục Định nghĩa
          </span>
          &rarr;
        </button>
      </Link>
    </div>
  </div>
);
