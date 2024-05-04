export const genRandomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getTwoFormatDate = (num: number) => {
  return num.toString().padStart(2, '0');
};

export const getCookie = (key: string) => {
  const name = key + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return '';
};
export const getPercentage = (data: number, total: number) => {
  return Math.round((data / total) * 100);
};

export const getYMD = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const returnedDate = date.getDate();

  return {
    year,
    month,
    date: returnedDate,
  };
};

export const getStringYMD = ({
  year,
  month,
  date,
}: {
  year: number;
  month: number;
  date: number;
}) => {
  return `${year}년 ${month}월 ${date}일`;
};

export const getStringMMDD = ({
  month,
  date,
}: {
  year?: number;
  month: number;
  date: number;
}) => {
  return `${month}월 ${date}일`;
};

export const getStringDateAndTime = (date: Date) => {
  let hour = date.getHours();
  hour = hour >= 13 ? hour - 12 : hour;
  const dayNight = hour >= 13 ? '오후' : '오전';

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일. ${dayNight} ${hour}시 ${date.getMinutes()}분`;
};
