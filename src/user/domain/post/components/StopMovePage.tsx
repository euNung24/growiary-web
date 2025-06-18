'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTitleIcon,
  AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog';

type StopMovePageProps = {
  isPreventCondition: boolean;
};

const StopMovePage = ({ isPreventCondition }: StopMovePageProps) => {
  const router = useRouter();
  const isClickedFirst = useRef(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [moveResolveFn, setMoveResolveFn] = useState<((choice: boolean) => void) | null>(
    null,
  );

  const openModalAndWaiteForChoice = () => {
    return new Promise<boolean>(resolve => {
      setModalOpen(true);
      setMoveResolveFn(() => resolve);
    });
  };

  const handleOpenStopModal = async () => {
    return await openModalAndWaiteForChoice();
  };

  const handleMoveModal = () => {
    if (moveResolveFn) {
      setModalOpen(false);
      moveResolveFn(true);
    }
  };

  const handleNotMoveModal = () => {
    if (moveResolveFn) {
      setModalOpen(false);
      moveResolveFn(false);
    }
  };

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

  const handlePopState = useCallback(async () => {
    // 페이지를 벗어나지 않아야 하는 경우
    if (isPreventCondition && !(await handleOpenStopModal())) {
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

    if (isPreventCondition) {
      const newPush = async (href: string, options?: NavigateOptions | undefined) => {
        // 페이지를 벗어나지 않아야 하는 경우
        if (!(await handleOpenStopModal())) {
          return;
        }

        originalPush(href, options);
        return;
      };

      router.push = newPush;
    } else {
      router.push = originalPush;
    }
    return () => {
      router.push = originalPush;
    };
  }, [router, isPreventCondition]);

  return (
    <AlertDialog open={modalOpen}>
      <AlertDialogTrigger className="hidden">글쓰기 중단 팝업</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitleIcon
            src="/assets/icons/info.png"
            width={32}
            height={32}
            alt="info"
          />
          <AlertDialogTitle>글쓰기를 중단하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            변경사항이 저장되지 않을 수 있습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleNotMoveModal}>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleMoveModal}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StopMovePage;
