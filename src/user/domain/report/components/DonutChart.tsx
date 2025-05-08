import { cn } from '@/shared/utils/cn';

type DonutChartProps = {
  data: number;
  color?: string;
};

// 원 위의 각도 (라디안 단위)
const angleInRadians = (angleInDegrees: number) => {
  return (angleInDegrees * Math.PI) / 180;
};

// 특정 각도에 대한 좌표 계산 함수
const calculateCoordinates = (angle: number, radius: number) => {
  const angleRad = angleInRadians(angle);
  const x = radius * Math.sin(angleRad);
  const y = -radius * Math.cos(angleRad);

  return [Math.floor(x), Math.floor(y)];
};

const DonutChart = ({ data: value, color = '#154284' }: DonutChartProps) => {
  let total: number = 0;

  const angle = value * 3.6;
  const separatorWidth = 0;
  const slice = `${color} ${total}% ${(total += value - separatorWidth) - 0.2}%`;
  const separator = `white ${total}% ${(total += separatorWidth) - 0.2}%`;
  const [x, y] = calculateCoordinates(angle, 56.5);

  const gradient = `conic-gradient(${slice}, ${separator})`;

  const before =
    'before:block before:w-2.5 before:h-2.5 before:rounded-full before:bg-primary-700 before:absolute before:top-0 before:left-[50%] before:translate-x-[-50%]';

  const after = `block w-3 h-3 rounded-full bg-primary-100 absolute`;

  return (
    <div
      className={cn('relative h-[123px] w-[123px] rounded-full z-[-1]', before)}
      style={{ background: gradient }}
    >
      <div className="absolute h-[103px] w-[103px] bg-primary-700 border border-[10px] border-white-0 rounded-full left-[10px] top-[10px] flex justify-center items-center text-white-0 font-sb20">
        {value}%
      </div>
      <div
        className={cn(after)}
        style={{
          top: 'calc(50% - 6px)',
          left: 'calc(50% - 6px)',
          transform: `translate(${x}px, ${y}px)`,
        }}
      ></div>
    </div>
  );
};

export default DonutChart;
