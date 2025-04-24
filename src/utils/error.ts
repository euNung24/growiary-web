export const setError = async (response: Response) => {
  const { message } = await response.json();

  if (response.status === 400) {
    switch (message) {
      case '만료된 토큰입니다.':
        return new Error('Expired token');
      case '유효하지 않은 토큰입니다.':
        return new Error('Invalid token');
      case '관리자만 접근 가능합니다.':
        return new Error('Unauthorized');
      default:
        return new Error(message);
    } 
  }
  
  return new Error('Network response was not ok');
};
