import AdminChatroom from '@components/AdminChatroom';
import { getAllMessages } from '@lib/supabase';
import { validateToken } from 'pages/api/admin';

export async function getServerSideProps({ req, res }) {
  let user;

  try {
    user = validateToken(req.cookies.TIENGLONG_ACCESS_TOKEN);
  } catch (error) {
    return {
      redirect: {
        permanent: true,
        destination: '/',
      },
    };
  }

  const messages = await getAllMessages(10);

  return { props: { messages } };
}

const AdminChatroomPage = ({ messages }) => {
  return <AdminChatroom messages={messages} />;
};

export default AdminChatroomPage;
