import AdminLoginForm from '@components/admin/AdminLoginForm';
import ReLoginModal from '@components/layouts/modals/ReLoginModal';
import { getAdminToken } from '@lib/utils';
import { verifyToken, withAuth } from '@lib/withAuth';

export const getServerSideProps = withAuth(async function ({ req, error }) {
  try {
    if (error) {
      return { props: { error: error.code || '' } };
    }
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
});

const AdminPage = ({ error }) => {
  if (error === 'auth/id-token-expired') return <ReLoginModal />;
  return (
    <div className="h-[94%] w-full overflow-hidden">
      <div className="h-full w-full bg-slate-400 grid-item-center">
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default AdminPage;
