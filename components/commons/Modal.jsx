import Backdrop from '@components/layouts/Backdrop';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default function Modal({ children }) {
  return typeof window !== 'undefined'
    ? ReactDOM.createPortal(
        <Backdrop>
          <div className="w-full rounded-md lg:w-1/2 max-h-96 p-4 bg-yellow-600 shadow-lg shadow-black border border-black flex flex-col items-center justify-evenly">
            {children}
          </div>
        </Backdrop>,
        document.getElementById('modal')
      )
    : null;
}
