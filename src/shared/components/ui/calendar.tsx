'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/shared/utils/cn';
import { buttonVariants } from '@/shared/components/ui/button';
import { WEEK, WEEK_ENG } from '@/shared/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  btnDisabled?: boolean;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  btnDisabled = false,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('w-full m-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-start pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center ml-auto',
        nav_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          btnDisabled && 'pointer-events-none',
        ),
        nav_button_previous: '',
        nav_button_next: '',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2 gap-2.5',
        cell: 'h-6 w-6 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'font-r14 text-gray-800 rounded-full h-6 w-6 p-0 font-normal aria-selected:opacity-100',
        ),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary-900 text-white-0 hover:bg-primary hover:text-white-0 focus:bg-primary-900 focus:text-white-0',
        day_today: 'bg-primary-50 text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
        CaptionLabel: ({ displayMonth }) => (
          <div className="font-r16 text-primary-900">
            {displayMonth.getFullYear()}년 {displayMonth.getMonth() + 1}월{' '}
          </div>
        ),
        HeadRow: () => (
          <tr className="flex gap-2.5">
            {WEEK.map((week, i) => (
              <th
                key={WEEK_ENG[i]}
                scope="col"
                className="font-r12 text-gray-500 rounded-md w-6 font-normal"
                aria-label={WEEK[i]}
              >
                {week}
              </th>
            ))}
          </tr>
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
