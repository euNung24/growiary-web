export const SERVER_ERROR = {
  EXPIRED_TOKEN: '만료된 토큰입니다.',
  INVALID_TOKEN: '유효하지 않은 토큰입니다.',
  ONLY_ADMIN_ACCESS: '관리자만 접근 가능합니다.',
};

export const ALERT_ERROR_MESSAGE: Record<keyof typeof SERVER_ERROR, string> = {
  EXPIRED_TOKEN: '만료된 토큰입니다. 다시 로그인해주세요.',
  INVALID_TOKEN: '유효하지 않은 토큰입니다. 다시 로그인해주세요.',
  ONLY_ADMIN_ACCESS: '관리자만 접근 가능합니다.',
};
