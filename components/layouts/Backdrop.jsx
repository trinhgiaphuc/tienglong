import * as React from 'react';

export default function Backdrop({ children }) {
  return (
    <div className="fixed inset-0 flex flex-col font-ole justify-center items-center bg-black bg-opacity-80 z-50">
      <div className="relative flex justify-center items-center">
        <div className="2xl:container  2xl:mx-auto py-48 px-4 md:px-28 flex justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
