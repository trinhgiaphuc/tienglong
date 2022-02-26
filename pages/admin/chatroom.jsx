import AdminChatroom from '@components/admin/AdminChatroom';
import { getMessages } from '@lib/supabase';
import { validateToken } from 'pages/api/admin';

export async function getServerSideProps({ req, res }) {
  let user;

  try {
    user = validateToken(req.cookies.TIENGLONG_ACCESS_TOKEN);
    // if (user.keys().length === 0) throw new Error('asd');
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
  return <AdminChatroom messages={messages} />;
};

export default AdminChatroomPage;
