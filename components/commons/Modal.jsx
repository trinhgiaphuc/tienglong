import Backdrop from '@components/layouts/Backdrop';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default function Modal({ children, setClose }) {
  return typeof window !== 'undefined'
    ? ReactDOM.createPortal(
      <Backdrop>
        <div className="w-full rounded-md lg:w-1/2 max-h-96 p-4 bg-yellow-600 shadow-lg shadow-black border border-black flex flex-col items-center justify-evenly">
          {typeof setClose !== 'undefined' ? <button className="p-2 w-12 h-12 ml-auto" onClick={setClose}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 252 252"><path d="M126 0a126 126 0 1 0 0 252 126 126 0 0 0 0-252zm0 234a108 108 0 1 1 0-216 108 108 0 0 1 0 216z" /><path d="M165 87c-4-3-10-3-13 0l-26 26-26-26a9 9 0 1 0-13 13l26 26-26 26a9 9 0 1 0 13 13l26-26 26 26a9 9 0 0 0 13 0c3-4 3-10 0-13l-26-26 26-26c3-3 3-9 0-13z" /></svg>
          </button> : null}
          {children}
        </div>
      </Backdrop>,
      document.getElementById('modal')
    )
    : null;
}
