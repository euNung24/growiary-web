import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import Chip from '@/shared/components/Chip';
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

type ActiveUserCardProps = {
  title: string;
  date: string;
  value: number;
  accValue: number;
};
const ActiveUserCard = ({ title, date, value, accValue }: ActiveUserCardProps) => {
  return (
    <Card className="w-full h-auto">
      <CardHeader>
        <CardTitle className="flex justify-between font-sb14">
          {title}
          <time className="font-r14">{date}</time>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between font-sb24">
        {value?.toLocaleString()}
        <Chip
          className={cn(
            'self-center inline-flex items-center gap-2',
            accValue > 0
              ? 'bg-success-900'
              : accValue < 0
                ? 'bg-error-900'
                : 'bg-caution-900',
          )}
        >
          {accValue > 0 ? (
            <ArrowUpRight width={14} height={14} />
          ) : accValue < 0 ? (
            <ArrowDownRight width={14} height={14} />
          ) : (
            <ArrowRight width={14} height={14} />
          )}
          {accValue < 0 ? '-' : '+'}
          {Math.abs(accValue)?.toLocaleString()}
        </Chip>
      </CardContent>
    </Card>
  );
};

export default ActiveUserCard;
