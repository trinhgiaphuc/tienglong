import { useAuth } from '@lib/userContext';
import Image from 'next/image';

const ChatCard = props => {
  const { user } = useAuth();

  if (!user) return null;

  return user.id === props.user.id ? (
    <MyChatCard {...props} />
  ) : (
    <OthersChatCard {...props} />
  );
};

const OthersChatCard = ({ content, user, createdAt }) => {
  return (
    <div className="p-4 flex items-center justify-start gap-2 ">
      <div className="w-16 h-16 aspect-square rounded-full overflow-hidden">
        <Image
          src={user.avatar || '/default_avatar_image.jpg'}
          alt="user avatar"
          width={50}
          height={50}
          layout="responsive"
        />
      </div>
      <div className="px-4 py-2 rounded-3xl flex items-start flex-col my-border">
        <p className="smaller-text-responsive">
          {new Date(createdAt).toLocaleString()}
        </p>
        <p className="text-responsive text-center self-center max-w-[30ch]">
          {content}
        </p>
      </div>
    </div>
  );
};

const MyChatCard = ({ content, user, createdAt }) => {
  return (
    <div className="p-4 flex items-center justify-end gap-2">
      <div className="px-4 py-2 rounded-3xl flex items-start flex-col my-border ">
        <p className="smaller-text-responsive">
          {new Date(createdAt).toLocaleString()}
        </p>
        <p className="text-responsive text-center self-center max-w-[35ch]">
          {content}
        </p>
      </div>
      <div className="w-16 h-16 aspect-square rounded-full overflow-hidden">
        <Image
          src={user.avatar || '/default_avatar_image.jpg'}
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
