import Link from 'next/link';
import React from 'react';

const Hero = React.memo(function WrappedHero() {
  return (
    <div className="hero">
      <div className="my-border col-span-2 grid-item-center">
        <h1 className="title logo-responsive text-center">Tiếng Lòng</h1>
      </div>

      <Link href="/define" passHref>
        <div className="my-border px-4 py-2 row-span-2 cursor-pointer animate-black-white grid-item-center">
          <p className="bigger-text-responsive uppercase font-medium text-center mt-auto md:leading-[1.1] md:mt-0">
            định nghĩa mọi thứ theo cách của bạn
          </p>
        </div>
      </Link>

      <div className="my-border h-full px-4 py-2 col-span-2 grid-item-center">
        <p className="bigger-text-responsive text-center uppercase">
          <span className="font-medium text-zinc-800">ngân hàng từ lóng </span>
          <span className="font-ole underline">số 1</span>
          <span className="font-medium text-zinc-800"> Việt Nam</span>
        </p>

        <div className="w-full m-auto flex p-2">
          <Link href="/define" passHref>
            <a className="ml-auto p-1 font-medium my-border animate-white-black">
              📚Định nghĩa📚
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default Hero;
