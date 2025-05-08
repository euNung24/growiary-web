import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

type TotalCardProps = {
  title: string;
  value: number;
};
const TotalCard = ({ title, value }: TotalCardProps) => {
  return (
    <Card className="w-full h-auto flex-1">
      <CardHeader>
        <CardTitle className="font-r14">{title}</CardTitle>
      </CardHeader>
      <CardContent className="font-sb24 flex-none mt-auto">{value}</CardContent>
    </Card>
  );
};

export default TotalCard;
