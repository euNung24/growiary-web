import { ChangeEventHandler, KeyboardEventHandler, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';

type TagProps = {
  list?: string[];
};
const Tag = ({ list }: TagProps) => {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const spanWidthRef = useRef(0);
  const [input, setInput] = useState('');
  const [tags, setTags] = useState(list || []);
  const handleRemoveTag = (idx: number) => {
    const filteredTags = tags.filter((v, i) => i !== idx);
    setTags(filteredTags);
  };

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = e => {
    const target = e.target as HTMLInputElement;
    setInput(target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      return;
    }
  };

  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = e => {
    const target = e.target as HTMLInputElement;

    if (!input) {
      target.style.width = '67px';
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const copiedTags = [...tags];
      copiedTags.push(input);
      setTags(copiedTags);
      setInput('');
      return;
    }

    spanWidthRef.current = spanRef.current?.getBoundingClientRect().width || 0;
    target.style.width = spanWidthRef.current + 'px';
  };

  return (
    <div className="flex gap-2">
      <ul className="flex gap-2">
        {tags.map((v, i) => (
          <li
            key={`${i}_${v}`}
            className="bg-secondary-50 font-r16 text-gray-800 py-[11px] pl-[10px] pr-[6px] rounded"
          >
            {v}
            <button className="w-[22px] h-[22px] ml-1" onClick={() => handleRemoveTag(i)}>
              X
            </button>
          </li>
        ))}
      </ul>
      <div className="flex items-center relative">
        <Input
          type="text"
          placeholder="태그입력"
          className="py-[11px] w-[67px] pl-[10px] pr-0 border-none text-gray-400"
          onChange={handleChangeInput}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          value={input}
        />
        <span ref={spanRef} className="absolute pl-3 opacity-0 z-[-1]">
          {input || '태그입력'}
        </span>
        <button className="w-[22px] h-[22px] ml-1" onClick={() => {}}>
          X
        </button>
      </div>
    </div>
  );
};

export default Tag;
