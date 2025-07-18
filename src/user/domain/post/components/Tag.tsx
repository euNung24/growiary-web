import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';

import { X } from 'lucide-react';
import { ControllerRenderProps } from 'react-hook-form';

import { Input } from '@/shared/components/ui/input';
import { cn } from '@/shared/utils/cn';

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
    <div className="flex font-r12 pl-3">
      <ul className="flex">
        {tags?.map((v, i) => (
          <li
            key={`${i}_${v}`}
            className={cn(
              'flex items-center text-gray-900 py-2 pl-2.5 rounded',
              !setTags && 'px-2.5',
            )}
          >
            {v}
            <X
              width={16}
              height={16}
              className={cn(
                'ml-1 inline-block text-gray-400 cursor-pointer',
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
              className="py-2 w-[67px] pl-[10px] pr-0 border-none text-gray-900"
              onChange={handleChangeInput}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              value={input}
              maxLength={10}
            />
            <span ref={spanRef} className="absolute pl-3 opacity-0 z-[-1]">
              {input || '태그입력'}
            </span>
            <div className="group flex">
              <X
                width={16}
                height={16}
                className="ml-1 inline-block text-gray-200 group-hover:text-gray-400 cursor-pointer"
                onClick={handleDeleteInput}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Tag;
