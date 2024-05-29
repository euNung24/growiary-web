import { useEffect, useRef } from 'react';

type RectAreaChartProps = {
  data?: [string, number][] | null;
};

const RectAreaChart = ({ data }: RectAreaChartProps) => {
  const containerWidth = 412;
  const containerHeight = 308;

  const firstRectRef = useRef<HTMLDivElement | null>(null);
  const secondRectRef = useRef<HTMLDivElement | null>(null);
  const thirdRectRef = useRef<HTMLDivElement | null>(null);
  const fourthRectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      !firstRectRef.current ||
      !secondRectRef.current ||
      !thirdRectRef.current ||
      !fourthRectRef.current ||
      !data?.length
    )
      return;

    // 가장 큰 데이터와 두 번째로 큰 데이터, 가장 작은 데이터와 두 번째로 작은 데이터의 비율 계산
    const [first, second, third, fourth] = [
      data[0][1],
      data[1][1],
      data[2][1],
      data[3][1],
    ];

    const firstWidth = (first / (first + third)) * containerWidth;

    const firstHeight = (first / (first + second)) * containerHeight;
    const thirdHeight = (third / (third + fourth)) * containerHeight;

    // 직사각형 그리기
    if (firstRectRef.current) {
      firstRectRef.current.style.width =
        (firstWidth !== containerWidth ? firstWidth - 1 : containerWidth) + 'px';
      firstRectRef.current.style.height =
        (firstHeight !== containerHeight ? firstHeight - 1 : containerHeight) + 'px';
      firstRectRef.current.textContent = `${data[0][0]} ${data[0][1]}%`;
    }

    if (secondRectRef.current) {
      secondRectRef.current.style.width =
        (firstWidth !== containerWidth ? firstWidth - 1 : containerWidth) + 'px';
      secondRectRef.current.style.height = containerHeight - firstHeight - 1 + 'px';
      secondRectRef.current.textContent = `${data[1][0]} ${data[1][1]}%`;
    }

    if (thirdRectRef.current) {
      thirdRectRef.current.style.width = containerWidth - firstWidth - 1 + 'px';
      thirdRectRef.current.style.height =
        (thirdHeight !== containerHeight ? thirdHeight - 1 : containerHeight) + 'px';
      thirdRectRef.current.textContent = `${data[2][0]} ${data[2][1]}%`;
    }
    if (fourthRectRef.current) {
      fourthRectRef.current.style.width = containerWidth - firstWidth - 1 + 'px';
      fourthRectRef.current.style.height = containerHeight - thirdHeight - 1 + 'px';
      fourthRectRef.current.textContent = `${data[3][0]} ${data[3][1]}%`;
    }
    secondRectRef.current.style.display =
      firstHeight === containerHeight ? 'none' : 'flex';
    thirdRectRef.current.style.display = firstWidth === containerWidth ? 'none' : 'flex';
    fourthRectRef.current.style.display =
      thirdHeight === containerHeight ? 'none' : 'flex';
  }, [data]);

  return (
    <div className="rounded-3xl overflow-hidden text-white-0 flex justify-between *:flex *:flex-col *:justify-between w-[412px] h-[308px] mx-auto">
      <div className="*:flex *:items-center *:justify-center *:transition-colors">
        <div className="bg-primary-700 hover:bg-primary-900" ref={firstRectRef}></div>
        <div className="bg-primary-600 hover:bg-primary-800" ref={secondRectRef}></div>
      </div>
      <div className="*:flex *:items-center *:justify-center *:transition-colors">
        <div className="bg-primary-300 hover:bg-primary-500" ref={thirdRectRef}></div>
        <div className="bg-primary-200 hover:bg-primary-400" ref={fourthRectRef}></div>
      </div>
    </div>
  );
};

export default RectAreaChart;
