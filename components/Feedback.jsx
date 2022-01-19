import { IoPaperPlaneSharp } from 'react-icons/io5';

const FeedBack = () => {
  const handleSubmit = e => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className="my-border">
      <div className="my-border group cursor-pointer flex-center bg-black text-white font-ole">
        <h2 className="title-responsive font-medium px-4 text-center py-20 uppercase ">
          Bạn đọc phản hồi
        </h2>
        <IoPaperPlaneSharp className="bigger-text-responsive hidden lg:block group-hover:animate-fly transition-all duration-700" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="my-border px-2 py-8 flex-center flex-col gap-6"
      >
        <input
          className="p-2 pt-4 outline-none border-2 w-[95%] border-black uppercase "
          type="text"
          placeholder="tên xưng hô thân mật"
        />
        <input
          className="p-2 pt-4 outline-none border-2 w-[95%] border-black uppercase"
          type="email"
          placeholder="địa chỉ email"
        />
        <textarea
          className="p-4  outline-none border-2 w-[95%] h-96 border-black uppercase"
          type="text"
          placeholder="phản hồi của bạn"
        />

        <div className="p-2 relative flex">
          <input
            type="checkbox"
            className="opacity-0  absolute h-8 w-8"
            id="get-email"
          />
          <CheckBoxIcon />
          <label
            htmlFor="get-email"
            className="font-medium cursor-pointer outline-none text-responsive"
          >
            Nhận tin tức mới từ Tiếng Lòng
          </label>
        </div>

        <button className="p-4 w-[75%] bg-black text-white uppercase font-medium transition-all active:scale-[0.98]  outline-none shadow-sm shadow-black">
          Gửi
        </button>
      </form>
    </div>
  );
};

const CheckBoxIcon = () => (
  <div className="bg-white border-2 rounded-md border-black w-8 h-8 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-black">
    <svg
      className="fill-current hidden w-3 h-3 text-black pointer-events-none"
      version="1.1"
      viewBox="0 0 17 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(-9 -11)" fill="#1865d8" fillRule="nonzero">
          <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
        </g>
      </g>
    </svg>
  </div>
);

export default FeedBack;
