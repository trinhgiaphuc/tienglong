const Modal = () => {
  return (
    <div
      id="large-modal"
      tabIndex="1"
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
    >
      <div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          Hello Worlds
        </div>
      </div>
    </div>
  );
};

export default Modal;
