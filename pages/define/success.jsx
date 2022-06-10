import React from 'react';
import DefinePageLink from '@components/buttons/DefinePageLink';

export default function SuccessPage() {
  return (
    <div className="h-[95vh] grid-item-center">
      <div className="mx-auto prose h-1/2 flex flex-col justify-evenly">
        <h1 className="font-ole text-center">
          Cảm ơn vì đóng góp của bạn, định nghĩa đã được thêm vào danh sách phê
          duyệt
        </h1>

        <div className="container  mx-auto flex items-center justify-evenly">
          <DefinePageLink href="/define">Thêm Định Nghĩa Mới</DefinePageLink>
          <DefinePageLink href="/">Trở Về Trang Chủ</DefinePageLink>
        </div>
      </div>
    </div>
  );
}
