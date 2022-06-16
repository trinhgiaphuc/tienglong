import AdminLoginForm from '@components/admin/AdminLoginForm';
import { getUserToken } from '@lib/utils';
import { verifyFirebaseToken } from '@lib/firebase-admin';

export default function AdminPage({ username, image }) {
  console.log(username);
  console.log(image);
  return (
    <div className="h-[94%] w-full overflow-hidden">
      <div className="h-full w-full bg-slate-400 grid-item-center">
        <AdminLoginForm />
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  try {
    const { role, username, image } = await verifyFirebaseToken(
      getUserToken(req)
    );
    if (role.includes('admin')) return { props: { username, image } };
    else return { redirect: { destination: '/', permanent: false } };
  } catch (error) {
    return {
      redirect: {
        destination: '/enter',
        permanent: false,
      },
    };
  }
}
