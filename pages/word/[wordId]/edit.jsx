import React from 'react';
import { useRouter } from 'next/router';
import Title from '@components/word/Title';
import AddWordForm from '@components/word/AddWordForm';

const EditWordPage = () => {
  const router = useRouter();

  console.log(router.query);

  return (
    <div className="">
      <div className="py-5 bg-black flex-center">
        <Title color="white">Chỉnh Sửa Từ</Title>
      </div>
      <AddWordForm />
    </div>
  );
};

export async function getServerSideProps(ctx) {
  return { props: {} };
}

export default EditWordPage;
