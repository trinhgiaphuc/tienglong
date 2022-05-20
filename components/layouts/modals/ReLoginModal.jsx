import * as React from 'react';
import { handleSignOut } from '@lib/firebase';

import Backdrop from '../Backdrop';

export default function ReLoginModal() {
  return (
    <Backdrop>
      <div className="w-96 md:w-auto bg-black bg-opacity-70 relative flex flex-col justify-center items-center py-16 px-4 md:px-24 xl:py-24 xl:px-36">
        <div role="banner">
          <div className="w-36 h-36 p-2 border-green-400 border-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14"
              xmlSpace="preserve"
            >
              <path
                d="M14 5c-.6-3-2.6-5-7-5-5.5 0-7 4.5-7 5 3-2.5 5-3 7-3s3 1.5 3 3c0 1-.6 2-2 3L5 5v9h9l-3-3c1.4-1 3.4-3.5 3-6z"
                fill="#32CD3f"
              />
            </svg>
          </div>
        </div>
        <div className="mt-12">
          <h1
            role="main"
            className="text-3xl uppercase dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-center text-gray-800"
          >
            phiên đăng nhập đã hết hạn
          </h1>
        </div>
        <div className="mt">
          <p className="mt-6  sm:w-80 prose-xl dark:text-white leading-7 text-center text-gray-800">
            Xin vui lòng đăng nhập lại để tiếp tục
          </p>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full dark:text-gray-800 dark:hover:bg-gray-100 dark:bg-white sm:w-auto mt-14 text-base leading-4 text-center text-white py-6 px-16 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-800 hover:bg-black font-ole uppercase font-semibold"
        >
          Đăng Nhập Lại
        </button>
      </div>
    </Backdrop>
  );
}
