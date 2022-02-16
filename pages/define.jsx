import AddWordForm from '@components/AddWordForm';
import SectionTitle from '@components/SectionTitle';

export default function DefinePage() {
  return (
    <div className="flex flex-col h-[94%]">
      <SectionTitle title="Danh Mục Định Nghĩa" />
      <AddWordForm />
    </div>
  );
}
