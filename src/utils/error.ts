export const setError = async (response: Response) => {
  const { message } = await response.json();
  if (response.status === 400 && message === '만료된 토큰입니다.') {
    return new Error('Expired token');
  } else if (response.status === 400 && message === '유효하지 않은 토큰입니다.') {
    return new Error('Invalid token');
  } else if (response.status === 400 && message === '관리자만 접근 가능합니다.') {
    return new Error('Unauthorized');
  }
  return new Error('Network response was not ok');
};
