import Router from 'next/router';
import { IoPaperPlaneSharp, IoArrowBack } from 'react-icons/io5';
import CheckBoxIcon from './CheckboxIcon';

const Feedback = () => {
  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className="my-border h-full">
      <div className="my-border relative group flex-center bg-black text-white">
        <button
          onClick={() => Router.back()}
          className="absolute top-0 left-0 p-4"
        >
          <IoArrowBack className="text-4xl" />
        </button>
        <h2 className="title-responsive  px-4 text-center py-20 uppercase ">
          Bạn đọc phản hồi
        </h2>
        <IoPaperPlaneSharp className="bigger-text-responsive hidden lg:block group-hover:animate-fly transition-all duration-700" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="my-border px-2 py-8 flex-center flex-col gap-6"
      >
        <input
          className="my-1 sm:my-0 p-4 outline-none tracking-wide border-2 w-[95%] border-black "
          type="text"
          placeholder="TÊN XƯNG HÔ THÂN MẬT"
        />
        <input
          className="my-1 sm:my-0 p-4 outline-none tracking-wide border-2 w-[95%] border-black"
          type="email"
          placeholder="ĐỊA CHỈ EMAIL"
        />
        <textarea
          className="my-1 sm:my-0 p-4  outline-none border-2 tracking-wide w-[95%] h-96 border-black"
          type="text"
          placeholder="PHẢN HỒI CỦA BẠN"
        />

        <div className="my-1 sm:my-0 p-2 relative flex-center">
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

        <button className="my-1 sm:my-0 p-4 w-[75%] bg-black text-white text-responsive uppercase font-medium transition-all active:scale-[0.98]  outline-none shadow-sm shadow-black">
          Gửi
        </button>
      </form>
    </div>
  );
};

export default Feedback;
