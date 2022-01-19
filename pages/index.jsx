import FeedBack from '@components/Feedback';
import Hero from '@components/Hero';
import WordList from '@components/WordList';
import { IoPlayForward } from 'react-icons/io5';
import Metatags from '@components/Metatags';

export default function Home() {
  return (
    <div>
      <Metatags title="Home Page" />

      <Hero />

      <main className="my-border text-zinc-800">
        <div>
          <div className="my-border flex-center group cursor-pointer ">
            <IoPlayForward className="title-responsive animate-section opacity-100 group-hover:animate-left-right-out" />
            <h2 className="title-responsive font-medium px-4 text-center py-20 uppercase">
              Từ hôm nay
            </h2>
            <IoPlayForward className="title-responsive animate-section opacity-0 -translate-x-[100%] group-hover:animate-left-right-in" />
          </div>

          <WordList />
        </div>
      </main>
      {/* FOOTER SECTION */}

      <footer className="my-border">
        <FeedBack />
      </footer>
    </div>
  );
}
