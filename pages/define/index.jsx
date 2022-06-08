import AddWordForm from '@components/word/AddWordForm';
import Title from '@components/word/Title';
import { getUserToken } from '@lib/utils';

export default function DefinePage() {
  return (
    <div className="h-body my-border flex flex-col overflow-y-scroll">
      <div className="my-border py-5 flex-center">
        <Title>Danh Mục Định Nghĩa</Title>
      </div>
      <AddWordForm />
    </div>
  );
}

export async function getServerSideProps({ req }) {
  try {
    getUserToken(req);
    return { props: {} };
  } catch (error) {
    return {
      redirect: {
        destination: '/enter',
        permanent: false,
      },
    };
  }
}
