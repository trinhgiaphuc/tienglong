import AdminLoginForm from '@components/admin/AdminLoginForm';
import { getAdminToken } from '@lib/utils';
import { verifyToken } from '@lib/withAuth';

export async function getServerSideProps({ req, res }) {
  try {
    verifyToken(getAdminToken(req));
    return {
      redirect: {
        permanent: true,
        destination: '/admin/chatroom',
      },
    };
  } catch (error) {
    return { props: {} };
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
