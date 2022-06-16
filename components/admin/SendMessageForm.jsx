import * as React from 'react';

import fetcher from '@lib/fetcher';

import { IoAttach } from 'react-icons/io5';
import ImagePreview from './ImagePreview';

const SendMessageForm = () => {
  const [content, setContent] = React.useState({ image: '', text: '' });

  const handleSubmit = async e => {
    e.preventDefault();

    await fetcher('admin/chatroom', {
      content: content.text,
    });

    setContent({ text: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-12">
      <div className="col-span-1">
        <label
          className="my-border hover:cursor-pointer h-full w-full flex-center"
          htmlFor="image-input"
        >
          <IoAttach className="title-responsive" />
        </label>
        <input
          className="hidden"
          id="image-input"
          type="file"
          accept="image/*"
        />
      </div>

      <div className="my-border col-span-10 text-responsive relative">
        {/* {content.image.length === 0 ? null : (
        <ImagePreview setContent={setContent} src={content.image} />
      )} */}
        <input
          // onPasteCapture={e => {
          //   const file = e.clipboardData.files.item(0);
          //   const src = URL.createObjectURL(file);
          //   setContent({ ...content, image: src });
          // }}
          value={content.text}
          onChange={e => setContent({ ...content, text: e.target.value })}
          placeholder="tin nhắn..."
          className="w-full h-full px-4 outline-none"
          type="text"
        />
      </div>

      <button className="my-border col-span-1 text-responsive uppercase font-medium font-ole p-4">
        Gửi
      </button>
    </form>
  );
};

export default SendMessageForm;
