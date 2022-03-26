import { IoFlagOutline } from 'react-icons/io5';

const ReportButton = () => {
  return (
    <button className="active:scale-75 duration-700 mx-2 lg:mx-0 h-full">
      <div className="word-button">
        <IoFlagOutline className="prose prose-2xl text-black" />
        <p className="prose prose-sm lg:prose-lg text-black xl:prose-xl font-medium hidden sm:block">
          Báo Cáo
        </p>
      </div>
    </button>
  );
};

export default ReportButton;
