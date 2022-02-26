import AdminLoginForm from '@components/admin/AdminLoginForm';
import { validateToken } from 'pages/api/admin';

export async function getServerSideProps({ req, res }) {
  let user;

  try {
    user = validateToken(req.cookies.TIENGLONG_ACCESS_TOKEN);
    if (user) {
      return {
        redirect: {
          permanent: true,
          destination: '/admin/chatroom',
        },
      };
    }
  } catch (error) {
    return { props: {} };
  }
}

const AdminPage = () => {
  return (
    <div className="h-[94%] w-full overflow-hidden">
      <div className="h-full w-full bg-slate-400 grid-item-center">
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default AdminPage;
