import AdminChatroom from '@components/admin/AdminChatroom';
import { getMessages } from '@lib/supabase';
import { validateToken } from '@lib/withAuth';
import Link from 'next/link';

export async function getServerSideProps({ req, res }) {
  let user;

  try {
    user = validateToken(req.cookies.ADMIN_ACCESS_TOKEN);
  } catch (error) {
    return {
      redirect: {
        permanent: true,
        destination: '/',
      },
    };
  }
  const messages = await getMessages(10);
  return { props: { messages } };
}

const AdminChatroomPage = ({ messages }) => {
  return (
    <div className="h-[94%] bg-neutral-400 flex items-center flex-col">
      <Link href="/admin/approve">
        <a className="text-responsive p-2 text-center self-start uppercase hover:underline">
          &#8592; Duyệt Bài
        </a>
      </Link>
      <AdminChatroom messages={messages} />
    </div>
  );
};

export default AdminChatroomPage;
