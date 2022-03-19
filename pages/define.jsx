import AddWordForm from '@components/word/AddWordForm';
import SectionTitle from '@components/word/SectionTitle';

export default function DefinePage() {
  return (
    <div className="flex flex-col h-[94%]">
      <SectionTitle>Danh Mục Định Nghĩa</SectionTitle>
      <AddWordForm />
    </div>
  );
}
