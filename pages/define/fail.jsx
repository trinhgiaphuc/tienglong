import DefinePageLink from '@components/buttons/DefinePageLink';

export default function FailPage({ isTrolling }) {
  if (isTrolling) return <h1>Tới Đây Chi Dọ</h1>;

  return (
    <div className="h-[95vh] grid-item-center">
      <div className="mx-auto prose">
        <h1 className="font-ole text-center">
          Qua Kiểm Duyệt Sơ Bộ, Hệ Thống Phát Hiện Bạn Đã Sử Dụng Một Số Từ Ngữ
          Không Phù Hợp. Nếu Sai Sót Này Nằm Ở Phía Chúng Tôi, Xin Bạn Thứ Lỗi
          Và Liên Hệ Chúng Tôi Để Tránh Các Sai Sót Này Xảy Ra Trong Tương Lai
        </h1>

        <div className="container mx-auto flex items-center justify-evenly">
          <DefinePageLink href="/">
            Yêu Cầu Quản Trị Viên Kiểm Tra Lại
          </DefinePageLink>
          <DefinePageLink href="/">Trở Về Trang Chủ</DefinePageLink>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { referer = '/' } = ctx.req.headers;

  if (referer !== 'http://localhost:3000/define') {
    return { props: { isTrolling: true } };
  }

  return { props: { isTrolling: false } };
}
