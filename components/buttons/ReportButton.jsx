const { IoFlagOutline } = require('react-icons/io5');

const ReportButton = () => {
  return (
    <button className="word-button active:scale-75 duration-700 ml-auto">
      <IoFlagOutline className="bigger-text-responsive" />
      <p className="text-2xl font-medium">Báo Cáo</p>
    </button>
  );
};

export default ReportButton;
