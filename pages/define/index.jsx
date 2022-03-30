import AddWordForm from '@components/word/AddWordForm';
import SectionTitle from '@components/word/SectionTitle';
import Title from '@components/word/Title';

export default function DefinePage() {
  return (
    <div className="h-body my-border flex flex-col overflow-y-scroll">
      <div className="my-border py-5 flex-center">
        <Title>Danh Mục Định Nghĩa</Title>
      </div>
      <AddWordForm />
    </div>
  );
}
