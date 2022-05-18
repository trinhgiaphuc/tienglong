import AdminLoginForm from '@components/admin/AdminLoginForm';
// import { verifyFirebaseToken } from '@lib/firebase-admin';
import { getAdminToken } from '@lib/utils';
import { validateToken } from '@lib/withAuth';

export async function getServerSideProps({ req, res }) {
  const adminToken = getAdminToken(req);
  if (!adminToken) return { props: {} };
  console.log('alo');

  try {
    let admin = validateToken(adminToken);
    if (!!admin) {
      return {
        redirect: {
          permanent: true,
          destination: '/admin/chatroom',
        },
      };
    }
  } catch (error) {
    console.error(error);
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
