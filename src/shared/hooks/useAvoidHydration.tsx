import { useEffect, useState } from 'react';

export const useAvoidHydration = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, [isClient]);

  return isClient;
};
