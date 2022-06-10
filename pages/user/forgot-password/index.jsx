import * as React from 'react';
import Router from 'next/router';

import { resetPassword } from '@lib/firebase';

export default function ForgotPassPage() {
  const [email, setEmail] = React.useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    await resetPassword(email);
    Router.push('/user/forgot-password/success');
  }

  return (
    <div className="overflow-hidden bg-zinc-200">
      <div className="w-screen h-screen flex-center">
        <form onSubmit={handleSubmit} className="w-3/4 lg:w-1/2">
          <div className="flex justify-between">
            <label
              htmlFor="email"
              className="block text-lg font-ole font-bold text-gray-700 select-none"
            >
              Email
            </label>
          </div>
          <input
            autoComplete="false"
            name="email"
            id="email"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            placeholder="xin mời nhập email ở đây"
            className="w-full mt-2 mb-4 text-sm font-ole bg-white border border-zinc-700 rounded-lg p-4 outline-none placeholder-gray-400"
          />
          <button className="border-2 bg-black text-white font-ole text-xl p-2 rounded-lg text-center">
            Tiếp Theo
          </button>
        </form>
      </div>
    </div>
  );
}

ForgotPassPage.noNavigation = true;
