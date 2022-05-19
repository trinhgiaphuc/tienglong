import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@lib/userContext';
import { addNewDefinition } from '@lib/db';
import { useRouter } from 'next/router';

export default function AddWordForm() {
  const { username: author } = useAuth();
  const router = useRouter();
  const [otherTags, setOtherTags] = React.useState([]);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    let wordData = { ...data, tags: otherTags };
    const res = await addNewDefinition({ wordData, author });

    if (res.success) {
      router.push('/define/success');
    } else {
      console.error(res);
      router.push('/define/fail');
    }
  };
  console.log('errors', errors);

  function clearTag() {
    setValue('trend', '');
    setValue('source', '');
  }

  function handleSetTag() {
    let value = getValues('tags');
    if (value.length > 1) {
      setOtherTags([...otherTags, value]);
      setValue('tags', '');
    }
  }
  let createdYear = watch('createdYear', new Date().getFullYear());

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="my-border p-5 sm:p-10  w-full flex-center flex-col md:grid grid-cols-10 gap-10"
    >
      <input
        type="text"
        placeholder="Từ Ngữ"
        className="adding-word-input p-4 col-span-5"
        spellCheck={false}
        {...register('word', {
          required: true,
          min: [2],
          max: 150,
        })}
      />
      <textarea
        className="adding-word-input resize-none col-span-5 row-span-4"
        rows={15}
        spellCheck={false}
        placeholder="Định nghĩa"
        {...register('definition', {
          required: true,
          min: 5,
          max: 5000,
        })}
      />
      <textarea
        className="adding-word-input resize-none col-span-5"
        {...register('example', {
          required: true,
          min: 5,
          max: 5000,
        })}
        rows={8}
        spellCheck={false}
        placeholder="Ví Dụ"
      />

      <TagSection register={register} otherTags={otherTags} clearTag={clearTag}>
        <OtherTagsField register={register} handleSetTag={handleSetTag} />
      </TagSection>

      <div className="col-span-5 my-border rounded flex w-full">
        <PreviewTagsField
          otherTags={otherTags}
          setOtherTags={setOtherTags}
          createdYear={createdYear}
        />
        <SelectYearTag register={register} />
      </div>

      <SubmitField />
    </form>
  );
}

const SelectYearTag = ({ register }) => {
  const thisYear = new Date().getFullYear();
  const years = new Array(thisYear - 1999).fill('1').map((_, i) => i + 2000);

  return (
    <div className="col-span-1 h-full flex justify-center">
      <div className="h-full">
        <select
          {...register('createdYear')}
          className="appearance-none block rounded h-full p-4 min-w-max font-medium bg-white outline-none"
        >
          <option hidden value={thisYear}>
            Năm ({thisYear})
          </option>
          <option className="prose p-1 font-medium" value="DiSản">
            Di Sản
          </option>
          {years.map(year => (
            <option
              className="prose p-1 font-medium tracking-wide"
              key={year}
              value={year}
            >
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const SelectTrendTag = ({ register }) => (
  <div className="my-border flex flex-col ">
    <div className="wordList__tag">
      <input
        className="peer hidden"
        {...register('trend')}
        type="radio"
        value="khongloithoi"
        id="#khongloithoi"
      />
      <label
        className="radio-label peer-checked:bg-blue-400"
        htmlFor="#khongloithoi"
      >
        Không Lỗi Thời
      </label>
    </div>

    <hr />

    <div className="wordList__tag">
      <input
        className="peer hidden"
        {...register('trend')}
        type="radio"
        value="dangthinhhanh"
        id="#dangthinhhanh"
      />

      <label
        htmlFor="#dangthinhhanh"
        className="radio-label peer-checked:bg-blue-400"
      >
        Đang Thịnh Hành
      </label>
    </div>
    <hr />

    <div className="wordList__tag">
      <input
        className="peer hidden"
        {...register('trend')}
        type="radio"
        value="khongconphobien"
        id="#khongconphobien"
      />
      <label
        htmlFor="#khongconphobien"
        className="radio-label peer-checked:bg-blue-400"
      >
        Không Còn Phổ Biến
      </label>
    </div>
  </div>
);

const SelectSourceTag = ({ register }) => (
  <div className="my-border flex flex-col">
    <div className="wordList__tag">
      <input
        className="peer hidden"
        {...register('source')}
        type="radio"
        value="mienbac"
        id="#mienbac"
      />

      <label className="radio-label peer-checked:bg-red-400" htmlFor="#mienbac">
        Nguồn Gốc Từ Phía Bắc
      </label>
    </div>
    <hr />
    <div className="wordList__tag">
      <input
        className="peer hidden"
        {...register('source')}
        type="radio"
        value="mientrung"
        id="#mientrung"
      />
      <label
        className="radio-label peer-checked:bg-red-400"
        htmlFor="#mientrung"
      >
        Nguồn Gốc Từ Miền Trung
      </label>
    </div>
    <hr />
    <div className="wordList__tag">
      <input
        className="peer hidden"
        {...register('source')}
        type="radio"
        value="miennam"
        id="#miennam"
      />
      <label className="radio-label peer-checked:bg-red-400" htmlFor="#miennam">
        Nguồn Gốc Từ Phía Nam
      </label>
    </div>
  </div>
);

const OtherTagsField = ({ register, handleSetTag }) => (
  <React.Fragment>
    <input
      {...register('tags', { max: 200, min: 1 })}
      className="input border-none w-full p-5 peer"
      placeholder="Nhập từng thẻ sau đó ấn đính thẻ. (#Iambeautiful)"
      autoComplete="off"
    />

    <button
      className="my-border rounded min-w-max text-xs font-medium py-4 sm:text-inherit sm:px-2 sm:py-0 bg-orange-400 shadow-sm shadow-black animate-btn-scale"
      type="button"
      onClick={handleSetTag}
    >
      Đính Thẻ
    </button>
  </React.Fragment>
);

const TagSection = ({ register, children, clearTag }) => (
  <div className="adding-word-input col-span-5 relative flex flex-col sm:flex-row group">
    {children}
    <div className="selector group-hover:-translate-y-full rounded group-hover:z-10 peer-focus:z-10 peer-focus:-translate-y-full">
      <div className="my-border py-4 col-span-2 text-center text-black uppercase bg-lime-200">
        Một số thẻ gợi ý
      </div>
      <SelectTrendTag register={register} />
      <SelectSourceTag register={register} />
      <button
        onClick={clearTag}
        type="button"
        className="my-border col-span-2 py-4 outline-none font-medium hover:bg-gray-500"
      >
        Bỏ Chọn Tất Cả Thẻ Gợi Ý
      </button>
    </div>
  </div>
);

const PreviewTagsField = ({ otherTags = [], setOtherTags, createdYear }) => (
  <ul className="flex-grow border-r-2 border-black flex items-center p-4 overflow-x-scroll">
    <li key="defaultYear" className="italic font-bold text-zinc-700 mx-1">
      #{createdYear}
    </li>
    {otherTags.map(tag => (
      <li className="mx-1" key={tag}>
        <button
          className="italic font-bold text-zinc-700 hover:line-through"
          onClick={() => setOtherTags(otherTags.filter(t => t !== tag))}
        >
          {tag}
        </button>
      </li>
    ))}
  </ul>
);

const SubmitField = ({ formType }) => (
  <div className="my-1 sm:my-0 col-span-10 w-full">
    <button
      type="submit"
      className="my-border rounded w-full bg-black text-white p-4 font-medium uppercase active:animate-shrink"
    >
      {formType === 'edit' ? 'Cập Nhật' : 'Định Nghĩa'}
    </button>
  </div>
);
