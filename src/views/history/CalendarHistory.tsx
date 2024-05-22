import { Calendar } from '@/components/ui/calendar';
import { Dispatch, SetStateAction } from 'react';
import { SelectSingleEventHandler } from 'react-day-picker';

type CalendarHistoryProps = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  handleSelectADay: SelectSingleEventHandler;
};
const CalendarHistory = ({ date, setDate, handleSelectADay }: CalendarHistoryProps) => {
  return (
    <Calendar
      mode="single"
      month={date}
      onMonthChange={setDate}
      selected={date}
      onSelect={handleSelectADay}
      disabled={date => date > new Date() || date < new Date('1900-01-01')}
    />
  );
};

export default CalendarHistory;
