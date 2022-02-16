import { useAuth } from '@lib/userContext';

import Footer from '@components/Footer';
import Hero from '@components/Hero';
import Link from 'next/link';
import Metatags from '@components/Metatags';
import SectionWord from '@components/SectionWords';

export default function Home() {
  const { status } = useAuth();

  if (status === 'loading') return null;

  return (
    <div>
      <Metatags title="Home Page" />
      <Hero />

      <main className="my-border text-zinc-800">
        <SectionWord section="từ hôm nay" href="/today-words" />
        <DefineBanner />
        <SectionWord section="từ đang thịnh hành" href="/trending-words" />

        <div className="my-border relative group flex-center bg-black py-10 text-white">
          <h1 className="title-responsive px-4 text-center py-2 uppercase">
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
      <h2 className="title-responsive tracking-wide px-4 text-center py-2 rounded-full uppercase">
        Hôm nay bạn sẽ định nghĩa gì?
      </h2>
    </div>

    <div className="my-border group flex-center bg-black text-white py-3">
      <Link href="/define" passHref>
        <button className="text-responsive hover:scale-[1.02] py-4 transition-all active:scale-100">
          <span className="underline p-2 rounded-sm bg-white text-black">
            Đến Mục Định nghĩa
          </span>
          &rarr;
        </button>
      </Link>
    </div>
  </div>
);
