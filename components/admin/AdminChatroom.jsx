import ChatCard from './ChatCard';

import { getAvatarFromMessage, supabase } from '@lib/supabase';
import { useEffect, useRef, useState } from 'react';
import SendMessageForm from './SendMessageForm';

const AdminChatroom = ({ messages }) => {
  const [currentMsg, setCurrentMsg] = useState([]);

  const msgEndRef = useRef(null);

  const scrollToBottom = () => {
    msgEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    supabase
      .from('message')
      .on('INSERT', async payload => {
        console.log(payload);
        setCurrentMsg([...currentMsg, { ...payload.new }]);
      })
      .subscribe();

    scrollToBottom();
  }, [currentMsg]);

  return (
    <div className="my-border bg-white w-11/12 h-[90%] flex flex-col">
      <div className="my-border h-0 overflow-y-scroll flex-grow">
        {messages.map(mess => (
          <div key={mess.id}>
            <ChatCard {...mess} />
          </div>
        ))}
        {currentMsg.map(mess => {
          return (
            <div key={mess.id}>
              <ChatCard {...mess} />
            </div>
          );
        })}
        <div ref={msgEndRef} />
      </div>
      <SendMessageForm setCurrentMsg={setCurrentMsg} />
    </div>
  );
};

export default AdminChatroom;
