import { useEffect, useRef, useState } from 'react';

import Router from 'next/router';

import { Timestamp } from 'firebase/firestore';
import { createNewUser, getUsernameDoc } from '@lib/db';
import { auth } from '@lib/firebase';

import {
  IoCheckmarkCircleSharp,
  IoCloseCircleSharp,
  IoCogSharp,
} from 'react-icons/io5';

const badWords = ['congsan', 'cong_san', 'dmcs', 'dm_cs'];

const Result = ({ error }) => {
  return (
    <div
      className={`${
        error.length ? 'bg-red-500' : 'bg-green-500'
      } bg-opacity-90 p-4 rounded-lg`}
    >
      <p className="text-responsive">
        {error || 'Tên Người Dùng Hợp Lệ, Xin Mời Tiếp Tục'}
      </p>
    </div>
  );
};

const UsernameCheckForm = ({ setStatus, setUser, setUsername, username }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [nameAccepted, setNameAccepted] = useState(false);
  const [checkingName, setCheckingName] = useState(false);

  const ref = useRef(1);

  const checkName = async name => {
    for (const badWord of badWords) {
      if (name.includes(badWord)) {
        setError('Tên Người Dùng Có Chứa Từ Ngữ Không Hợp Lệ');
      } else if (name.length < 5) {
        setError('Xin Vui Lòng Nhập Tên Ít Nhất 5 Ký Tự');
      } else {
        const usernameDoc = await getUsernameDoc(name);
        if (usernameDoc.data()) setError('Tên Người Dùng Đã Có Người Dùng');
        setNameAccepted(true);
      }
    }
  };

  useEffect(() => {
    name.length === 0 ? (ref.current = 1) : (ref.current = 2);

    let timer;
    if (ref.current === 2) {
      timer = setTimeout(async () => {
        setCheckingName(true);
        await checkName(name);
        setCheckingName(false);
      }, 800);
    }

    return () => clearTimeout(timer);
  }, [error, name, username]);

  const handleSubmit = async e => {
    e.preventDefault();

    const { uid, email, photoURL } = auth.currentUser;

    const data = {
      id: uid,
      email,
      role: ['user'],
      username: name,
      image: photoURL,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    setUser(data);
    setUsername(name);

    await createNewUser(data);

    setStatus('authenticated');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-border bg-white flex-grow flex p-4"
    >
      <div className="w-full h-full flex-center flex-col gap-10 ">
        <label
          className="bigger-text-responsive uppercase font-medium"
          htmlFor="username"
        >
          Tên Người Dùng
        </label>

        {(error.length || nameAccepted) && !checkingName ? (
          <Result error={error} />
        ) : null}

        <div className="w-full flex-center flex-col gap-4">
          <div className="p-4 my-border w-3/4 rounded-md flex-center">
            <input
              id="username"
              value={name}
              onChange={e => {
                setNameAccepted(false);
                setError('');
                setName(e.target.value.toLowerCase().trim().replace(' ', ''));
              }}
              placeholder="Ví dụ: yeunhauthihieuchonhau89495"
              className="w-full p-2 outline-none"
              type="text"
            />
            {checkingName ? (
              <IoCogSharp className="text-yellow-500 text-responsive animate-spin" />
            ) : null}
            {error.length === 0 ? (
              nameAccepted && !checkingName ? (
                <IoCheckmarkCircleSharp className="text-green-500 text-responsive" />
              ) : null
            ) : (
              <IoCloseCircleSharp className="text-red-500 text-responsive" />
            )}
          </div>

          <div className="flex-center flex-col gap-1 font-medium sm:flex-row sm:gap-10">
            <div className="flex-center gap-1">
              <IoCogSharp className="text-yellow-500 text-responsive" />
              <p className="text-responsive">Đang Kiểm Tra</p>
            </div>
            <div className="flex-center gap-1">
              <IoCheckmarkCircleSharp className="text-green-500 text-responsive" />
              <p className="text-responsive">Tên Hợp Lệ</p>
            </div>
            <div className="flex-center gap-1">
              <IoCloseCircleSharp className="text-red-500 text-responsive" />
              <p className="text-responsive">Tên Không Hợp Lệ</p>
            </div>
          </div>
        </div>

        <button
          disabled={!nameAccepted || error.length}
          className={`p-4 my-border w-1/2 rounded-md bg-black text-responsive text-white uppercase font-medium ${
            (!nameAccepted || error.length) &&
            'bg-zinc-700 cursor-not-allowed border-none'
          }`}
        >
          Xác Nhận
        </button>
      </div>
    </form>
  );
};

export default UsernameCheckForm;
