import { addNewDefinition } from '@lib/db';
import { useAuth } from '@lib/userContext';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

const AddWordForm = () => {
  const router = useRouter();

  const { username } = useAuth();

  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');
  const [tags, setTags] = useState({ trend: '', source: '' });
  const [othersTags, setOthersTags] = useState('');

  const ref = useRef();

  const handleSelect = e => {
    if (e.target.name === 'muc_do_thinh_hanh') {
      setTags({ ...tags, trend: e.target.id });
    }
    if (e.target.name === 'nguon_goc') {
      setTags({ ...tags, source: e.target.id });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await addNewDefinition({
      word,
      definition,
      example,
      tags:
        othersTags.length > 0
          ? Object.values({ ...tags, ...othersTags.split(',') })
          : Object.values(tags),
      author: username,
    });

    if (res.success) {
      router.push(`/`);
    } else if (!res.success) {
      console.log(res.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-border p-5 sm:p-10 flex-grow bg-white w-full flex-center flex-col md:grid grid-cols-10 gap-10"
    >
      <input
        className="input w-full md:h-full text-responsive p-4 col-span-4"
        placeholder="Từ ngữ"
        minLength={2}
        onChange={e => setWord(e.target.value)}
        value={word}
        type="text"
        spellCheck={false}
      />

      <textarea
        rows={15}
        className="input w-full  md:h-full text-responsive resize-none col-span-6 row-span-3"
        placeholder="Định nghĩa"
        minLength={15}
        onChange={e => setDefinition(e.target.value)}
        value={definition}
        type="text"
        spellCheck={false}
      />
      <textarea
        rows={8}
        minLength={15}
        className="input w-full md:h-full text-responsive resize-none col-span-4"
        placeholder="Ví Dụ"
        onChange={e => setExample(e.target.value)}
        value={example}
        type="text"
        spellCheck={false}
      />

      <div
        className="input w-full md:h-full relative text-responsive flex col-span-4 group"
        ref={ref}
      >
        <input
          className="input border-none w-full p-5 show_select"
          placeholder="Ví Dụ: #vjppro#alo#hehehe"
          onChange={e =>
            setOthersTags(
              e.target.value.trim().toLocaleLowerCase().replace(' ', '')
            )
          }
          value={tags.other}
          type="text"
        />
        <div className="selector group-hover:scale-100 group-hover:-translate-y-full">
          {/* <SelectTest handleSelect={handleSelect} /> */}
          <SelectTrendTag handleSelect={handleSelect} />
          <SelectSourceTag handleSelect={handleSelect} />
        </div>

        <SelectYearTag />
      </div>

      <div className="bg-blue-400 col-span-10 w-full">
        <button className="my-border ml-auto w-full bg-black text-white p-4 font-medium uppercase">
          Định Nghĩa
        </button>
      </div>
    </form>
  );
};

const SelectYearTag = () => {
  const years = [];
  for (let i = 1800; i <= 2100; i++) {
    years.push(i);
  }
  return (
    <select
      className="outline-none show_select font-medium p-2 sm:p-4 tracking-wide text-responsive"
      name="years"
      id="select_year"
    >
      {years.map(year => (
        <option
          className="text-responsive tracking-wide"
          selected={year === new Date().getFullYear()}
          key={year}
          value={year}
        >
          {year}
        </option>
      ))}
    </select>
  );
};

// const SelectTest = ({ handleSelect }) => (
//   <div className="my-border flex flex-col bg-blue-400">
//     <div className="wordList__tag">
//       <input onChange={handleSelect} type="radio" name="test" id="op1" />
//       <label htmlFor="op1">Không Lỗi Thời</label>
//     </div>

//     <div className="wordList__tag">
//       <input onChange={handleSelect} type="radio" name="test" id="op2" />
//       <label htmlFor="op2">Đang Thịnh Hành</label>
//     </div>

//     <div className="wordList__tag">
//       <input onChange={handleSelect} type="radio" name="test" id="op3" />
//       <label htmlFor="op3">Không Còn Phổ Biến</label>
//     </div>
//   </div>
// );

const SelectTrendTag = ({ handleSelect }) => (
  <div className="my-border flex flex-col bg-red-400">
    <div className="wordList__tag">
      <input
        onChange={handleSelect}
        type="radio"
        name="muc_do_thinh_hanh"
        id="#khongloithoi"
      />
      <label htmlFor="#khongloithoi">Không Lỗi Thời</label>
    </div>

    <div className="wordList__tag">
      <input
        onChange={handleSelect}
        type="radio"
        name="muc_do_thinh_hanh"
        id="#dangthinhhanh"
      />
      <label htmlFor="#dangthinhhanh">Đang Thịnh Hành</label>
    </div>

    <div className="wordList__tag">
      <input
        onChange={handleSelect}
        type="radio"
        name="muc_do_thinh_hanh"
        id="#khongconphobien"
      />
      <label htmlFor="#khongconphobien">Không Còn Phổ Biến</label>
    </div>
  </div>
);

const SelectSourceTag = ({ handleSelect }) => (
  <div className="my-border flex flex-col bg-green-400">
    <div className="wordList__tag">
      <input
        onChange={handleSelect}
        type="radio"
        name="nguon_goc"
        id="#mienbac"
      />
      <label htmlFor="#mienbac">Nguồn Gốc Từ Phía Bắc</label>
    </div>
    <div className="wordList__tag">
      <input
        onChange={handleSelect}
        type="radio"
        name="nguon_goc"
        id="#mientrung"
      />
      <label htmlFor="#mientrung">Nguồn Gốc Từ Miền Trung</label>
    </div>
    <div className="wordList__tag">
      <input
        onChange={handleSelect}
        type="radio"
        name="nguon_goc"
        id="#miennam"
      />
      <label htmlFor="#miennam">Nguồn Gốc Từ Phía Nam</label>
    </div>
  </div>
);

export default AddWordForm;
