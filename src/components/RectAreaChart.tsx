import { useEffect, useRef } from 'react';

type RectAreaChartProps = {
  data?: [string, number][] | null;
};

const RectAreaChart = ({ data }: RectAreaChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerWidth = 412 * 2;
  const containerHeight = 308 * 2;

  useEffect(() => {
    if (!canvasRef.current || !data?.length) return;

    const ctx = canvasRef.current.getContext('2d');

    // 가장 큰 데이터와 두 번째로 큰 데이터, 가장 작은 데이터와 두 번째로 작은 데이터의 비율 계산
    const [first, second, third, fourth] = [
      data[0][1],
      data[1][1],
      data[2][1],
      data[3][1],
    ];

    const width = (first / (first + third)) * containerWidth;

    const secondDataY = (first / (first + second)) * containerHeight;
    const forthDataY = (third / (third + fourth)) * containerHeight;

    ctx!.font = '24px Arial';
    // 직사각형 그리기
    ctx!.fillStyle = '#154284';
    ctx!.fillRect(0, 0, width, secondDataY);
    ctx!.fillStyle = '#ffffff';
    ctx!.fillText(`${data[0][0]} ${data[0][1]}%`, width / 2 - 35, secondDataY / 2 + 7);

    if (second !== 0) {
      ctx!.fillStyle = '#204C90';
      ctx!.fillRect(0, secondDataY + 8, width, containerHeight);
      ctx!.fillStyle = '#ffffff';
      ctx!.fillText(
        `${data[1][0]} ${data[1][1]}%`,
        width / 2 - 35,
        (containerHeight - secondDataY) / 2 + secondDataY + 7,
      );
    }

    if (third !== 0) {
      ctx!.fillStyle = '#6E86B4';
      ctx!.fillRect(width + 8, 0, containerWidth, forthDataY);
      ctx!.fillStyle = '#ffffff';
      ctx!.fillText(
        `${data[2][0]} ${data[2][1]}%`,
        (containerWidth - width) / 2 + width - 35,
        forthDataY / 2 + 7,
      );
    }

    if (fourth !== 0) {
      ctx!.fillStyle = '#96A8CA';
      ctx!.fillRect(width + 8, forthDataY + 8, containerWidth, containerHeight);
      ctx!.fillStyle = '#ffffff';
      ctx!.fillText(
        `${data[3][0]} ${data[3][1]}%`,
        (containerWidth - width) / 2 + width - 35,
        (containerHeight - forthDataY) / 2 + forthDataY + 7,
      );
    }
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      width={containerWidth}
      height={containerHeight}
      className="rounded-3xl"
      style={{
        width: containerWidth / 2,
        height: containerHeight / 2,
      }}
    />
  );
};

export default RectAreaChart;
