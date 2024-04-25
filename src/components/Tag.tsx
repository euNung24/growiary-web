import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

type TagProps = {
  list?: string[];
};
const Tag = ({ list }: TagProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
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

  const handleDeleteInput = () => {
    setInput('');
    inputRef.current?.focus();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      return;
    }
  };

  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = e => {
    if (!input && inputRef.current) {
      inputRef.current.style.width =
        spanRef.current?.getBoundingClientRect().width + 'px';
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
  };

  useEffect(() => {
    if (!inputRef.current) return;

    inputRef.current.style.width = spanRef.current?.getBoundingClientRect().width + 'px';
  }, [input]);

  return (
    <div className="flex gap-2">
      <ul className="flex gap-2">
        {tags.map((v, i) => (
          <li
            key={`${i}_${v}`}
            className="bg-secondary-50 font-r16 text-gray-800 py-[11px] pl-[10px] pr-[6px] rounded"
          >
            {v}
            <X
              width={22}
              height={22}
              className="ml-1 inline-block text-gray-700 cursor-pointer"
              onClick={() => handleRemoveTag(i)}
            />
          </li>
        ))}
      </ul>
      <div className="flex items-center relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="태그입력"
          className="py-[11px] w-[67px] pl-[10px] pr-0 border-none text-gray-700"
          onChange={handleChangeInput}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          value={input}
        />
        <span ref={spanRef} className="absolute pl-3 opacity-0 z-[-1]">
          {input || '태그입력'}
        </span>
        <X
          width={22}
          height={22}
          className="ml-1 inline-block text-gray-400 hover:text-gray-700 cursor-pointer"
          onClick={handleDeleteInput}
        />
      </div>
    </div>
  );
};

export default Tag;
