import { cn } from '@/lib/utils';
import { Triangle } from 'lucide-react';
import { useState } from 'react';
import { ResPostType } from '@/types/postTypes';

const ReportByChar = () => {
  const strengthStyle = 'font-b28 text-primary-900';
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';
  const boxStyle = 'rounded-xl border border-gray-100 p-6';
  const [topic, setTopic] = useState<[string, ResPostType[]][] | null>(null);

  return (
    <section>
      <h2 className="title">글자수</h2>
      <p className={descriptionStyle}>
        <span className={strengthStyle}>12,310자</span> 글자를 작성했어요.
      </p>
      <div className={cn(boxStyle)}>
        <div className="flex gap-x-7 text-gray-400 font-r14 mb-5">
          <span>
            전체 <b className="ml-[5px] text-gray-700">00개</b>
          </span>
          <span>
            평균 <b className="ml-[5px] text-gray-700">00개</b>
          </span>
          <span>
            최대 <b className="ml-[5px] text-gray-700">00개</b>
          </span>
        </div>
        <div className="flex gap-x-3">
          <div className="group flex-1 bg-primary-50 rounded-xl px-6 py-3 text-primary-900 hover:bg-primary-700 hover:text-white-0">
            <div className="flex justify-between text-gray-500 group-hover:text-white-0">
              <span className="font-r16">3월</span>
              <span className="font-r12 flex items-center gap-x-0.5">
                123자
                <Triangle
                  className="text-primary-200"
                  fill="#96A8CA"
                  width={6}
                  height={6}
                />
              </span>
            </div>
            <div className="flex items-center justify-center font-m36 mt-2 mb-[38px] group-hover:text-white-0">
              1234{' '}
              <span className="ml-2 text-gray-800 font-r16 group-hover:text-white-0">
                자
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>추후 변경</div>
    </section>
  );
};

export default ReportByChar;
