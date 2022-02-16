import ChatCard from './ChatCard';

import { auth } from '@lib/firebase';
import { supabase } from '@lib/supabase';
import { IoAttach } from 'react-icons/io5';
import { useEffect, useState } from 'react';

const AdminChatroom = ({ messages }) => {
  const [currentMsg, setCurrentMsg] = useState(messages);

  const handleSubmit = async e => {
    e.preventDefault();
    const content = e.target[1].value;
    await supabase
      .from('message')
      .insert({ content, userId: auth.currentUser.uid });
  };

  useEffect(() => {
    const unsub = supabase
      .from('message')
      .on('INSERT', payload => {
        setCurrentMsg([...currentMsg, payload.new]);
      })
      .subscribe();

    return () => supabase.removeSubscription(unsub);
  }, [currentMsg]);

  return (
    <div className="h-[94%] bg-neutral-400 grid-item-center">
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
          <input
            placeholder="tin nhắn..."
            className="my-border col-span-10 text-responsive px-4 outline-none"
            type="text"
          />
          <button className="my-border col-span-1 text-responsive uppercase font-medium font-ole p-4">
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminChatroom;
