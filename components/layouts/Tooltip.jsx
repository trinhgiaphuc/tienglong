import * as React from 'react';

export default function Tooltip({ display, error }) {
  return display ? (
    <div className="absolute top-1/2 left-1/4 font-ole flex-col z-30 items-center flex mb-6 group-hover:flex">
      <div className="w-5 h-5 -mb-3 rotate-45 bg-gray-700 "></div>
      <span className="relative z-10 p-4 text-xs leading-none text-white whitespace-no-wrap bg-gray-700  shadow-lg rounded-md">
        {error}
      </span>
    </div>
  ) : null;
}
