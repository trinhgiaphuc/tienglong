import AdminLoginForm from '@components/admin/AdminLoginForm';
import ReLoginModal from '@components/layouts/modals/ReLoginModal';
import { verifyFirebaseToken } from '@lib/firebase-admin';
import { getAdminToken, getUserToken } from '@lib/utils';
import { verifyToken } from '@lib/withAuth';

export async function getServerSideProps({ req }) {
  try {
    await verifyFirebaseToken(getUserToken(req));
  } catch (error) {
    return {
      redirect: {
        destination: '/enter',
        permanent: true,
      },
    };
  }

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
