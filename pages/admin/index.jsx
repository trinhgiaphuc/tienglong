import AdminLoginForm from '@components/admin/AdminLoginForm';
import { validateToken } from '@lib/withAuth';

export async function getServerSideProps({ req, res }) {
  let user;

  const token = req.cookies?.ADMIN_ACCESS_TOKEN;
  if (!token) return { props: {} };

  try {
    user = validateToken(req.cookies.ADMIN_ACCESS_TOKEN);
    if (user) {
      return {
        redirect: {
          permanent: true,
          destination: '/admin/chatroom',
        },
      };
    }
  } catch (error) {
    console.log(error);
  }
}

const AdminPage = props => {
  return (
    <div className="h-[94%] w-full overflow-hidden">
      <div className="h-full w-full bg-slate-400 grid-item-center">
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default AdminPage;
