import AdminLoginForm from '@components/AdminLoginForm';

const AdminPage = () => {
  return (
    <div className="h-[94%] w-full overflow-hidden">
      <div className="h-full w-full bg-slate-400 grid-item-center">
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default AdminPage;
