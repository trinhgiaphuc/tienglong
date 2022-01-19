import Link from 'next/link';
import Navigation from './Navigation';

export default function Hero() {
  return (
    <div className="hero">
      <div className="my-border px-4 col-span-2 grid-item-center">
        <h1 className="title logo-responsive text-center leading-tight md:leading-tight">
          Tiếng Lòng
        </h1>
      </div>

      <div className="my-border px-4 py-2 row-span-2 cursor-pointer animate-black-white grid-item-center">
        <p className="bigger-text-responsive uppercase font-medium text-center mt-auto md:leading-[1.1] md:mt-0">
          định nghĩa mọi thứ theo cách của bạn
        </p>
      </div>

      <div className="my-border h-full px-4 py-2 col-span-2 grid-item-center">
        <p className="bigger-text-responsive text-center uppercase">
          <span className="font-medium text-zinc-800">thế giới quan</span>{' '}
          <span className="font-ole underline">kỳ thú</span>
        </p>

        <div className="w-full m-auto flex p-2">
          <Link href="/" passHref>
            <a className="ml-auto p-1 font-medium my-border animate-white-black">
              📚Định nghĩa📚
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
