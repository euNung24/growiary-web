/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useRef } from 'react';

const RectAreaChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dataPercentages = [20, 10, 30, 40];

  useEffect(() => {
    if (!canvasRef.current) return;

    const containerWidth = 400;
    const containerHeight = 300;

    const ctx = canvasRef.current.getContext('2d');
    const sortedDataPercentages = dataPercentages.slice().sort((a, b) => a - b);

    // 가장 큰 데이터와 두 번째로 큰 데이터, 가장 작은 데이터와 두 번째로 작은 데이터의 비율 계산
    const firstWidth = (sortedDataPercentages[3] / 100) * containerWidth;
    const secondWidth = (sortedDataPercentages[2] / 100) * containerWidth;
    const thirdWidth = (sortedDataPercentages[1] / 100) * containerWidth;
    const fourthWidth = (sortedDataPercentages[0] / 100) * containerWidth;

    // 가장 큰 데이터와 두 번째로 큰 데이터, 가장 작은 데이터와 두 번째로 작은 데이터의 너비가 같도록 조정
    const adjustedFirstWidth = (firstWidth + secondWidth) / 2;
    const adjustedSecondWidth = adjustedFirstWidth;
    const adjustedThirdWidth = (thirdWidth + fourthWidth) / 2;
    const adjustedFourthWidth = adjustedThirdWidth;

    // 직사각형 그리기
    ctx!.fillStyle = getRandomColor();
    ctx!.fillRect(0, 0, adjustedFirstWidth, containerHeight);

    ctx!.fillStyle = getRandomColor();
    ctx!.fillRect(0, 120, adjustedFirstWidth, containerHeight);

    ctx!.fillStyle = getRandomColor();
    ctx!.fillRect(adjustedFirstWidth, 0, 400, containerHeight);

    ctx!.fillStyle = getRandomColor();
    ctx!.fillRect(adjustedFirstWidth, 80, 400, containerHeight);
  });

  // 랜덤한 색상 반환 함수
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  return <canvas ref={canvasRef} width={400} height={300} className="rounded-3xl" />;
};

export default RectAreaChart;
