import * as React from 'react';
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import { useAuth } from '@lib/userContext';
import { addNewDefinition } from '@lib/db';

import Tooltip from '@components/layouts/Tooltip';

export default function AddWordForm() {
  const router = useRouter();
  const [otherTags, setOtherTags] = React.useState([]);
  const [error, setError] = React.useState({ isError: false });
  const { user = {} } = useAuth();

  const { register, handleSubmit, getValues, setValue, watch } = useForm();

  const onSubmit = async ({ createdYear, source, trend, ...data }) => {
    let wordData = {
      ...data,
      tags: [createdYear, source, trend, ...otherTags].filter(Boolean),
    };
    await addNewDefinition({ ...wordData, author: user.username });
    router.push('/define/success');
  };

  function clearTag() {
    setValue('trend', '');
    setValue('source', '');
  }

  function handleRemoveError(errorName) {
    if (error[errorName]) {
      return () => setError(p => ({ ...p, [errorName]: null }));
    } else {
      return () => { };
    }
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
      className="my-border p-5 sm:p-10 h-auto w-full flex-center flex-col md:grid grid-cols-10 gap-10"
      onSubmit={handleSubmit(onSubmit, error =>
        setError({ isError: true, ...error })
      )}
    >
      <div className="adding-word-input col-span-5 relative">
        <input
          type="text"
          className=" w-full h-full py-2 outline-none"
          placeholder="Từ Ngữ"
          spellCheck={false}
          maxLength={150}
          onClick={handleRemoveError('word')}
          {...register('word', {
            required: {
              value: true,
              message: 'Xin hãy điền đầy đủ vùng cần thiết',
            },
            minLength: {
              value: 1,
              message: 'Từ ngữ phải có ít nhất một ký tự',
            },
          })}
        />
        {error.isError && error.word ? (
          <Tooltip display error={error.word.message} />
        ) : null}
      </div>
      <div className="adding-word-input col-span-5 row-span-4 relative">
        <textarea
          className="w-full h-full resize-none outline-none"
          rows={5}
          onClick={handleRemoveError('definition')}
          spellCheck={false}
          maxLength={5000}
          placeholder="Định nghĩa"
          {...register('definition', {
            required: {
              value: true,
              message: 'Xin hãy điền đầy đủ vùng cần thiết',
            },
            minLength: {
              value: 5,
              message: 'Xin hãy định nghĩa dài hơn một chút',
            },
          })}
        />
        {error.isError && error.definition ? (
          <Tooltip display error={error.definition.message} />
        ) : null}
      </div>

      <div className="adding-word-input col-span-5 relative">
        <textarea
          className="resize-none w-full h-full outline-none"
          onClick={handleRemoveError('example')}
          maxLength={5000}
          {...register('example', {
            required: {
              value: true,
              message: 'Xin hãy điền đầy đủ vùng cần thiết',
            },
            minLength: {
              value: 5,
              message: 'Xin hãy đặt ví dụ dài hơn một chút',
            },
          })}
          rows={8}
          spellCheck={false}
          placeholder="Ví Dụ"
        />
        {error.isError && error.example ? (
          <Tooltip display error={error.example.message} />
        ) : null}
      </div>

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
          className="appearance-none block rounded h-full p-4 minLength-w-max font-medium bg-white outline-none"
        >
          <option hidden value={thisYear} defaultChecked>
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
      {...register('tags', { maxLength: 200, minLength: 1 })}
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
      className="my-border rounded w-full bg-black text-white p-4 font-medium uppercase"
    >
      {formType === 'edit' ? 'Cập Nhật' : 'Định Nghĩa'}
    </button>
  </div>
);
