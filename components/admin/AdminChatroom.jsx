import ChatCard from './ChatCard';

import { auth } from '@lib/firebase';
import { getAvatarFromMessage, supabase } from '@lib/supabase';
import { IoAttach } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';

const AdminChatroom = ({ messages }) => {
  const [currentMsg, setCurrentMsg] = useState(messages);
  const [content, setContent] = useState({ image: '', text: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    await supabase
      .from('message')
      .insert({ content: content.text, userId: auth.currentUser.uid });
    setContent('');
  };

  const msgEndRef = useRef(null);

  const scrollToBottom = () => {
    msgEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    supabase
      .from('message')
      .on('INSERT', async payload => {
        const userId = await getAvatarFromMessage(payload.new.userId);
        const mess = { ...payload.new, userId };
        setCurrentMsg([...currentMsg, mess]);
      })
      .subscribe();

    scrollToBottom();
  }, [currentMsg]);

  return (
    <div className="my-border bg-white w-11/12 h-[90%] flex flex-col">
      <div className="my-border h-0 overflow-y-scroll flex-grow">
        {currentMsg.map(mess => {
          return (
            <div key={mess.id}>
              <ChatCard
                user={mess.userId}
                content={mess.content}
                createdAt={mess.created_at}
              />
            </div>
          );
        })}
        <div ref={msgEndRef} />
      </div>
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

        <ChatInput content={content} setContent={setContent} />

        <button className="my-border col-span-1 text-responsive uppercase font-medium font-ole p-4">
          Gửi
        </button>
      </form>
    </div>
  );
};

export default AdminChatroom;
