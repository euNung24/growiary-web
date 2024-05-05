'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type StopMovePageProps = {
  url: string;
  isPreventCondition: boolean;
  fn: (
    url?: () => void,
    push?: () => (href: string, options?: NavigateOptions | undefined) => void,
  ) => void | boolean;
};

const StopMovePage = ({ url, isPreventCondition, fn }: StopMovePageProps) => {
  const router = useRouter();
  const isClickedFirst = useRef(false);

  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      if (isPreventCondition) {
        e.preventDefault();
        isClickedFirst.current = false;
        e.returnValue = true; // legacy 브라우저를 위해 추가한다.
      }
    },
    [isPreventCondition],
  );

  const handlePopState = useCallback(() => {
    // 페이지를 벗어나지 않아야 하는 경우
    if (isPreventCondition) {
      // 함수
      fn(() => true);
      history.pushState(null, '', '');
      return;
    }

    history.back();
  }, [isPreventCondition]);

  // 뒤로 가기
  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handlePopState]);

  useEffect(() => {
    if (!isClickedFirst.current) {
      history.pushState(null, '', '');
      isClickedFirst.current = true;
    }
  }, []);

  // 새로고침, 페이지 닫기
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  // 링크 이동
  useEffect(() => {
    const originalPush = router.push;
    const newPush = async (href: string, options?: NavigateOptions | undefined) => {
      // 페이지를 벗어나지 않아야 하는 경우
      if (href !== `${url}` && isPreventCondition) {
        // 함수
        fn(() => originalPush(href, options));
        return;
      }

      originalPush(href, options);
      return;
    };
    router.push = newPush;
    return () => {
      router.push = originalPush;
    };
  }, [router, isPreventCondition]);

  return <></>;
};

export default StopMovePage;
