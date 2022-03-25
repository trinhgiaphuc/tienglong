import { IoFlagOutline } from 'react-icons/io5';

const ReportButton = () => {
  return (
    <button className="word-button active:scale-75 duration-700 ">
      <IoFlagOutline className="prose prose-2xl text-black" />
      <p className="prose prose-sm lg:prose-lg text-black xl:prose-xl font-medium hidden sm:block">
        Báo Cáo
      </p>
    </button>
  );
};

export default ReportButton;
