import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import logoSrc from '@public/assets/logo.svg';

const Hero = React.memo(function WrappedHero() {
  return (
    <div className="hero font-ole">
      <div className="my-border col-span-2 p-2 grid-item-center">
        <Image src={logoSrc} width={600} height={200} alt="logo tieng long" />
      </div>

      <Link href="/define" passHref>
        <div className="my-border text-3xl px-4 py-2 row-span-2 cursor-pointer animate-black-white grid-item-center">
          <h2 className="uppercase font-medium text-center mt-auto md:leading-[1.1] md:mt-0">
            định nghĩa mọi thứ theo cách của bạn
          </h2>
        </div>
      </Link>

      <div className="my-border  h-full px-4 py-2 col-span-2 grid-item-center">
        <p className="text-center prose-base lg:prose-2xl xl:text-3xl uppercase">
          <span className=" font-medium text-zinc-800">ngân hàng từ lóng </span>
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
