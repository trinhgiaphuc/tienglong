import AdminChatroom from '@components/admin/AdminChatroom';
import { getMessages } from '@lib/supabase';
import { getAdminToken } from '@lib/utils';
import { verifyToken } from '@lib/withAuth';
import Link from 'next/link';

export default function AdminChatroomPage() {
  return (
    <div className="h-[94%] bg-neutral-400 flex items-center flex-col">
      <Link href="/admin/approve">
        <a className="text-responsive p-2 text-center self-start uppercase hover:underline">
          &#8592; Duyệt Bài
        </a>
      </Link>
      <AdminChatroom />
    </div>
  );
}

export async function getServerSideProps({ req }) {
  try {
    verifyToken(getAdminToken(req));
    return {props: {}};
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
}
