export const color = {
  first: '#96A8CA',
  second: '#BFCADF',
  third: '#E6EAF2',
};

export type Context = {
  chart: {
    data: {
      labels: { [key: number]: string };
    };
  };
  dataIndex: number;
};

export function getImage(src: string) {
  const img = new Image();
  img.src = src;
  return img;
}

export const getBoxImageSize = (highestData: number, currentData: number) => {
  const boxSize = 0.65;
  // const boxSize = 0.2;
  // 최댓값의 / 10
  let minus = highestData / 3;
  // y값의 1
  let y = boxSize * 7 * minus;
  // y값을 더한 최댓값의 / 10
  minus = (highestData + y) / 10;
  const a = y + minus;
  y = boxSize * 10 * minus;

  return {
    yMin: currentData + a,
    yMax: currentData + y + a,
  };
};
