import { useAuth } from '@lib/userContext';
import Image from 'next/image';

const ChatCard = props => {
  const { user } = useAuth();

  if (!user) return null;

  return user.id === props.userId ? (
    <MyChatCard {...props} />
  ) : (
    <OthersChatCard {...props} />
  );
};

const OthersChatCard = ({ content, avatar, created_at, username }) => {
  return (
    <div className="p-4 flex items-center justify-start gap-2 font-ole">
      <div className="w-16 h-16 aspect-square rounded-full overflow-hidden">
        <Image
          src={avatar || '/default_avatar_image.jpg'}
          alt="user avatar"
          width={50}
          height={50}
          layout="responsive"
        />
      </div>
      <div className="p-4 rounded-3xl flex items-start flex-col my-border">
        <p className="text-xs">
          {new Date(created_at).toLocaleString('vi-VN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            minute: '2-digit',
            hour: '2-digit',
          })}
        </p>
        <div>
          <p className="text-base font-bold">{username}</p>
          <p className="text-base text-center self-center max-w-[30ch]">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

const MyChatCard = ({ content, avatar, created_at }) => {
  return (
    <div className="p-4 flex font-ole items-center justify-end gap-2">
      <div className="px-4 py-2 rounded-3xl flex items-start flex-col my-border ">
        <p className="text-xs">
          {new Date(created_at).toLocaleString('vi-VN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            minute: '2-digit',
            hour: '2-digit',
          })}
        </p>
        <p className="text-responsive text-center self-center max-w-[35ch]">
          {content}
        </p>
      </div>
      <div className="w-16 h-16 aspect-square rounded-full overflow-hidden">
        <Image
          src={avatar || '/default_avatar_image.jpg'}
          alt="user avatar"
          width={50}
          height={50}
          layout="responsive"
        />
      </div>
    </div>
  );
};

export default ChatCard;
