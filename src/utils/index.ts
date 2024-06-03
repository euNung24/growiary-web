import { format } from 'date-fns';

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

export const getFormatDate = (date: Date, formatString?: string) => {
  return format(date, formatString || 'yyyy-MM-dd');
}

export const getStringDateAndTime = (date: Date) => {
  let hour = date.getHours();
  const dayNight = hour >= 13 ? '오후' : '오전';
  hour = hour >= 13 ? hour - 12 : hour;

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일. ${dayNight} ${hour}시 ${date.getMinutes()}분`;
};

export const MENU_NAMES = {
  '기록하기': '기록하기',
  '나의 기록들': '나의 기록들',
  '추천 주제': '추천 주제',
  '기록 데이터 보기': '기록 데이터 보기',
  '도전과제': '도전과제',
};

export const menu = [
  {
    src: '/assets/icons/edit',
    alt: 'write a diary',
    name: MENU_NAMES['기록하기'],
    href: '/post',
    placeholder: '',
  },
  {
    src: '/assets/icons/calendar',
    alt: 'history',
    name: MENU_NAMES['나의 기록들'],
    href: '/history',
    placeholder: '',
  },
  {
    src: '/assets/icons/multi-window',
    alt: 'recommended topics',
    name: MENU_NAMES['추천 주제'],
    href: '/topics',
    placeholder: '간직하고 있는 좋은 질문이 있다면 공유해주세요',
    footer: true,
  },
  {
    src: '/assets/icons/report',
    alt: 'report',
    name: MENU_NAMES['기록 데이터 보기'],
    href: '/report',
    placeholder: '더 알고 싶은 기록 관련 데이터가 있다면 알려주세요',
    footer: true,
  },
  // {
  //   src: '/assets/icons/book',
  //   alt: 'retrospect tip',
  //   name: '회고 TIP',
  //   href: '#',
  // },
  {
    src: '/assets/icons/challenge',
    alt: 'challenge',
    name: MENU_NAMES['도전과제'],
    href: '/challenge',
    footer: true,
  },
];

export const NO_TOPIC_ID = 65;

export const WEEK = ['일', '월', '화', '수', '목', '금', '토'];
export const WEEK_ENG = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const TIME = ['새벽', '아침', '오후', '저녁'];
