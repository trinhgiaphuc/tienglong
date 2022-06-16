import * as React from 'react';

export default function Backdrop({ children }) {
  return (
    <div className="fixed inset-0 flex flex-col font-ole justify-center items-center bg-black bg-opacity-80 z-50 p-6">
      {children}
    </div>
  );
}
