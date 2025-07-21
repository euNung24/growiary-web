import { cn } from '@/shared/utils/cn';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import CalendarHistory from '@/user/features/post/components/history/CalendarHistory';
import { format } from 'date-fns';
import { Dispatch, SetStateAction, useState } from 'react';
import { SelectSingleEventHandler } from 'react-day-picker';
import useGetProfile from '@/shared/queries/profile/useGetProfile';

type MonthNavigatorProps = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  handleSelectADay: SelectSingleEventHandler;
};

const MonthNavigator = ({ date, setDate, handleSelectADay }: MonthNavigatorProps) => {
  const { data: profile } = useGetProfile();

  const [curretDate] = useState(() => new Date());

  const selected_format_YYYY_M = format(date, 'yyyy년 M월');
  const selected_format_YYYYMM = format(date, 'yyyyMM');
  const current_format_YYYYMM = format(curretDate, 'yyyyMM');

  const handleClickPrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate(), 0, 0, 0));
  };

  const handleClickNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate(), 0, 0, 0));
  };

  return (
    <div className="py-5 flex gap-x-3 items-center">
      <ChevronLeft
        width={24}
        height={24}
        className={cn(
          'cursor-pointer',
          !profile && 'cursor-default pointer-events-none text-gray-400',
        )}
        onClick={handleClickPrevMonth}
      />
      <div className="relative">
        <span className="block px-6 py-1.5 rounded-[30px] text-primary-900 font-sb18 bg-primary-50 lg:hidden">
          {selected_format_YYYY_M}
        </span>
        <Popover>
          <PopoverTrigger asChild role="button">
            <span className="px-6 py-1.5 rounded-[30px] text-primary-900 font-sb18 bg-primary-50 hidden break-keep text-center lg:block">
              {selected_format_YYYY_M}
            </span>
          </PopoverTrigger>
          <PopoverContent
            className="flex flex-col justify-center bg-white-0 w-auto"
            align="start"
          >
            <CalendarHistory
              date={date}
              setDate={setDate}
              handleSelectADay={handleSelectADay}
            />
          </PopoverContent>
        </Popover>
      </div>
      <ChevronRight
        width={24}
        height={24}
        className={cn(
          'cursor-pointer',
          +selected_format_YYYYMM >= +current_format_YYYYMM &&
            'cursor-default pointer-events-none text-gray-400',
          !profile && 'cursor-default pointer-events-none text-gray-400',
        )}
        onClick={handleClickNextMonth}
      />
    </div>
  );
};

export default MonthNavigator;
