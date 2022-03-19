import { createPortal } from 'react-dom';

const Modal = ({ children }) => {
  const makePortal = () => {
    return createPortal();
  };

  return (
    <div
      className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full"
      id="popup-modal"
    >
      <div className="relative px-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="p-6 pt-0 text-center">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
