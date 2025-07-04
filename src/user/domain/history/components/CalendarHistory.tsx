import { Dispatch, SetStateAction } from 'react';

import { SelectSingleEventHandler } from 'react-day-picker';

import useProfileContext from '@/shared/hooks/useProfileContext';
import { Calendar } from '@/shared/components/ui/calendar';

type CalendarHistoryProps = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  handleSelectADay: SelectSingleEventHandler;
};
const CalendarHistory = ({ date, setDate, handleSelectADay }: CalendarHistoryProps) => {
  const { profile } = useProfileContext();

  return (
    <Calendar
      mode="single"
      month={date}
      onMonthChange={setDate}
      selected={date}
      onSelect={handleSelectADay}
      btnDisabled={!profile}
      disabled={date => date > new Date() || date < new Date('1900-01-01')}
    />
  );
};

export default CalendarHistory;
