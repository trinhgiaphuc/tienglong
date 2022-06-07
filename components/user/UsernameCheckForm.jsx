import * as React from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';

import { Timestamp } from 'firebase/firestore';
import { checkUserNameExist, createNewUser } from '@lib/db';
import { auth, intergratePassword } from '@lib/firebase';

import {
  IoCheckmarkCircleSharp,
  IoCloseCircleSharp,
  IoCogSharp,
} from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import fetcher from '@lib/fetcher';

const badWords = ['congsan', 'cong_san', 'dmcs', 'dm_cs'];

export default function CompleteForm({ setStatus, setUser, setUsername }) {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!auth.currentUser) {
    router.push('/enter');
    return null;
  }

  const { uid, email, photoURL } = auth.currentUser;

  function passwordIsValid(password, repassword) {
    if (password !== repassword) {
      setError('Mật khẩu không giống nhau, xin vui lòng thử lại');
      return false;
    } else {
      return true;
    }
  }

  const onSubmit = async ({ password, repassword }) => {
    if (!passwordIsValid(password, repassword)) {
      return;
    }

    const data = {
      id: uid,
      email,
      username: name,
      image: photoURL,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    try {
      await intergratePassword(email, password)
        .then(async () => {
          await createNewUser(data)
            .then(async () => {
              await fetcher('user/create', { data: { ...data, password } })
                .then(() => {
                  setUser(data);
                  setUsername(name);
                  setStatus('authenticated');
                })
                .catch(error => {
                  throw error;
                });
            })
            .catch(error => {
              throw error;
            });
        })
        .catch(error => {
          throw error;
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, () => {
        if (
          errors.password?.type === 'required' ||
          errors.repassword?.type === 'required'
        ) {
          setError('Xin vui lòng điền đủ mật khẩu để hoàn tất');
        }
        if (
          errors.password?.type === 'minLength' ||
          errors.repassword?.type === 'minLength'
        ) {
          setError('Xin vui lòng thiết lập mật khẩu ít nhất 6 ký tự');
        }
      })}
      className="my-border bg-white flex-grow flex p-4 font-ole"
    >
      <div className="w-full h-full flex-center flex-col gap-5">
        <div className="aspect-square rounded-full overflow-hidden border-4 border-lime-300">
          <Image
            src="/assets/about.jpg"
            layout="fixed"
            width={250}
            height={250}
            alt="github avatart"
          />
        </div>

        <NameCheckInput name={name} setName={setName} />

        <div className="w-full flex-center flex-col gap-5">
          <div className="p-4 my-border w-3/4 lg:w-1/2 rounded-md flex-center">
            <p className="w-full p-2 outline-none select-none">{email}</p>
          </div>

          <div className="p-4 my-border w-3/4 lg:w-1/2 rounded-md flex-center">
            <input
              {...register('password', {
                required: true,
                minLength: 6,
                onChange() {
                  setError('');
                },
              })}
              placeholder="Mật khẩu"
              className="w-full p-2 outline-none"
              type="password"
            />
          </div>
          <div className="p-4 my-border w-3/4 lg:w-1/2 rounded-md flex-center">
            <input
              {...register('repassword', {
                required: true,
                minLength: 6,
                onChange() {
                  setError('');
                },
              })}
              placeholder="Nhập lại mật khẩu"
              className="w-full p-2 outline-none"
              type="password"
            />
          </div>
        </div>

        {error.length > 0 ? <Result error={error} /> : null}

        <button
          type="submit"
          className="p-4 my-border my-4 w-1/2 rounded-md bg-black text-responsive text-white uppercase font-medium"
        >
          Xác Nhận
        </button>
      </div>
    </form>
  );
}

function NameCheckLabel() {
  return (
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
  );
}

function NameCheckInput({ name, setName }) {
  const [error, setError] = React.useState('');
  const [nameAccepted, setNameAccepted] = React.useState(false);
  const [checkingName, setCheckingName] = React.useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const check = React.useCallback(checkUserNameExist(), []);
  const checkName = React.useCallback(
    async name => {
      for (const badWord of badWords) {
        if (name.includes(badWord)) {
          setError('Tên Người Dùng Có Chứa Từ Ngữ Không Hợp Lệ');
        } else if (name.length < 5) {
          setError('Xin Vui Lòng Nhập Tên Ít Nhất 5 Ký Tự');
        } else {
          const usernameExist = await check(name);
          if (usernameExist) setError('Tên Người Dùng Đã Có Người Dùng');
          else setNameAccepted(true);
        }
      }
    },
    [check]
  );

  React.useEffect(() => {
    let timer;
    if (name.length !== 0) {
      setCheckingName(true);
      timer = setTimeout(async () => {
        await checkName(name);
        setCheckingName(false);
      }, 800);
    }
    return () => clearTimeout(timer);
  }, [checkName, name]);

  return (
    <React.Fragment>
      <div className="w-full flex-center flex-col gap-4">
        <NameCheckLabel />

        {(error.length || nameAccepted) && !checkingName ? (
          <Result error={error} />
        ) : null}

        <div className="p-4 my-border w-3/4 lg:w-1/2 rounded-md flex-center">
          <input
            id="username"
            value={name}
            onChange={e => {
              setNameAccepted(false);
              setError('');
              setName(e.target.value.toLowerCase().trim().replace(' ', ''));
            }}
            placeholder="tên tài khoản ( hihi123)"
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
      </div>
    </React.Fragment>
  );
}

function Result({ error }) {
  return (
    <div
      className={`${
        error.length ? 'bg-red-500' : 'bg-green-500'
      } bg-opacity-90 p-4 rounded-lg`}
    >
      <p className="text-responsive">
        {error.length > 0 ? error : 'Tên Người Dùng Hợp Lệ, Xin Mời Tiếp Tục'}
      </p>
    </div>
  );
}
