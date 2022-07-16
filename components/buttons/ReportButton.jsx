import * as React from 'react';
import Modal from '@components/commons/Modal';
import fetcher from '@lib/fetcher';
import { IoFlagOutline } from 'react-icons/io5';

const ReportButton = ({ wordId }) => {
  const [openReport, setOpenReport] = React.useState(false);
  const [message, setMessage] = React.useState('');

  function handleSubmitReport(e) {
    e.preventDefault();
    fetcher('word/report', { wordId, message });
    setOpenReport(false);
  }

  if (openReport) {
    return <Modal setClose={() => setOpenReport(false)}>
      <div className="max-w-full sm:max-w-3xl mx-auto flex items-center">
        <form onSubmit={handleSubmitReport} className="w-full sm:w-[250px] p-4 mx-auto flex flex-col rounded-md">
          <textarea onChange={e => setMessage(e.target.value)} type="password" placeholder="Xin hãy cho chúng tôi biết lí do bạn muốn báo cáo từ ngữ này" rows={5} className="p-3 outline-none border-2 border-gray-800 rounded-md resize-none text-base" />
          <button className="px-2 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white mt-3 my-border" type="submit">Báo Cáo</button>
        </form>
      </div>
    </Modal>
  }

  return (
    <button onClick={() => setOpenReport(true)} className="active:scale-75 duration-700 word-button">
      <IoFlagOutline className="prose prose-2xl text-black" />
      <p className="prose prose-sm lg:prose-lg text-black xl:prose-xl font-medium hidden sm:block">
        Báo Cáo
      </p>
    </button>
  );
};

export default ReportButton;
