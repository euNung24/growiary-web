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
