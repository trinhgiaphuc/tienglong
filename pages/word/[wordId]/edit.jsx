import React from 'react';
import { useRouter } from 'next/router';

const EditWordPage = () => {
  const router = useRouter();

  console.log(router.query);

  return (
    <div>
      <p>EditWordPage</p>
      <p>word: {router.query.wordId}</p>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  return { props: {} };
}

export default EditWordPage;
