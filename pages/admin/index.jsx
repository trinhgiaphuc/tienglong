import AdminLoginForm from '@components/admin/AdminLoginForm';
import { getUserToken } from '@lib/utils';
import { verifyFirebaseToken } from '@lib/firebase-admin';

export default function AdminPage() {
  return (
    <div className="h-[94%] w-full overflow-hidden">
      <div className="h-full w-full bg-slate-400 grid-item-center">
        <AdminLoginForm />
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { result, error } = await verifyFirebaseToken(getUserToken(req));
  if (error) {
    return {
      redirect: {
        destination: '/enter',
        permanent: false,
      },
    }
  } else {
    const { role } = result;
    if (role.includes('admin')) return { props: {} };
    else return { redirect: { destination: '/', permanent: false } };
  }
}
