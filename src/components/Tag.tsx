import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { ControllerRenderProps } from 'react-hook-form';
import { cn } from '@/lib/utils';

type TagProps = {
  tags: string[];
  setTags?: ControllerRenderProps['onChange'];
};

const Tag = ({ tags, setTags }: TagProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const [input, setInput] = useState('');

  const handleRemoveTag = (idx: number) => {
    const filteredTags = tags.filter((v, i) => i !== idx);
    setTags && setTags(filteredTags);
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
      setTags && setTags(copiedTags);

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
        {tags?.map((v, i) => (
          <li
            key={`${i}_${v}`}
            className={cn(
              'flex items-center font-r16 text-gray-800 py-[11px] pl-2.5 pr-1.5 rounded',
              !setTags && 'px-2.5',
            )}
          >
            {v}
            <X
              width={22}
              height={22}
              className={cn(
                'ml-1 inline-block text-gray-700 cursor-pointer',
                !setTags && 'hidden',
              )}
              onClick={() => handleRemoveTag(i)}
            />
          </li>
        ))}
      </ul>
      <div className="flex items-center relative">
        {setTags && tags?.length <= 5 && (
          <>
            <Input
              ref={inputRef}
              type="text"
              placeholder="태그입력"
              className="py-[11px] w-[67px] pl-[10px] pr-0 border-none text-gray-800"
              onChange={handleChangeInput}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              value={input}
              maxLength={10}
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
          </>
        )}
      </div>
    </div>
  );
};

export default Tag;
