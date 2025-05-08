'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { UsersType } from '@/admin/type';
import { format } from 'date-fns';
import useGetAllUsers from '@/admin/hooks/useGetAllUsers';
import useGetPostsByUser from '@/admin/hooks/useGetPostsByUser';
import { useRecoilValue } from 'recoil';
import { TodayState } from '@/store/todayStore';
import AvgPostChart from '@/admin/components/total/AvgPostChart';
import { getFormatDate } from '@/utils';
import ActiveUserCard from '@/admin/components/total/ActiveUserCard';
import TotalCard from '@/admin/components/total/TotalCard';
import { handleError } from '@/apis/token/client';
import useGetProfile from '@/profile/hooks/useGetProfile';

const isTodayPost = (postDate: string) => {
  return format(new Date(postDate), 'yyyyMMdd') === format(new Date(), 'yyyyMMdd');
};

type Info = {
  dau: number;
  wau: number;
  mau: number;
  prevDau: number;
  prevWau: number;
  prevMau: number;
};
const TotalView = () => {
  const { data: profile } = useGetProfile();
  const {
    date: { year, month, date, day },
  } = useRecoilValue(TodayState);
  const userMutation = useGetAllUsers();
  const postByUserMutation = useGetPostsByUser();

  const [isClient, setIsClient] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState<UsersType[]>([]);
  const [info, setInfo] = useState<Info>({
    dau: 0,
    wau: 0,
    mau: 0,
    prevDau: 0,
    prevWau: 0,
    prevMau: 0,
  });
  const [postLength, setPostLength] = useState(0);
  const [avgPostByUser, setAvgPostByUser] = useState(0);
  const [avgPostByMonth, setAvgPostByMonth] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, []);

  useEffect(
    function getInitAllUsers() {
      if (!profile || !isClient) return;

      userMutation
        .mutateAsync()
        .then(res => {
          if (!res) return;
          setUserData(res.data);
          setIsAdmin(true);
        })
        .catch(error => {
          handleError(error);
        });
    },
    [profile, isClient],
  );
  useEffect(
    function getInitPostsByUser() {
      if (!profile || !isClient) return;

      let postLength = 0;

      postByUserMutation.mutateAsync().then(res => {
        if (!res) return;
        const { data: postsByUser } = res;
        let dau = 0;
        let wau = 0;
        let mau = 0;
        let prevDau = 0;
        let prevWau = 0;
        let prevMau = 0;
        const monthPostMap = [...new Array(6)].reduce((f, v, i) => {
          const key = getFormatDate(new Date(year, month - 6 + i, 1, 0, 0, 0), 'yyyy-MM');

          return { ...f, [key]: 0 };
        }, {});

        for (const posts of Object.values(postsByUser)) {
          postLength += posts.length;
          for (const post of posts) {
            const yyyyMM = getFormatDate(new Date(post.createdAt), 'yyyy-MM');

            if (yyyyMM in monthPostMap) {
              monthPostMap[yyyyMM]++;
            }

            // today
            dau += isTodayPost(post.createdAt) ? 1 : 0;
            // week (Mon - Sun)
            wau +=
              new Date(year, month - 1, date - (day === 0 ? 6 : day - 1), 0, 0, 0) <=
              new Date(post.createdAt)
                ? 1
                : 0;
            // month (1 ~ todayDate)
            mau +=
              new Date(year, month - 1, 1, 0, 0, 0) <= new Date(post.createdAt) ? 1 : 0;
            prevDau +=
              format(new Date(post.createdAt), 'yyyyMMdd') ===
              format(new Date(year, month - 1, date - 1), 'yyyyMMdd')
                ? 1
                : 0;
            prevWau +=
              new Date(year, month - 1, date - (day === 0 ? 13 : day + 6), 0, 0, 0) <=
                new Date(post.createdAt) &&
              new Date(year, month - 1, date - (day === 0 ? 6 : day - 1), 0, 0, 0) >
                new Date(post.createdAt)
                ? 1
                : 0;
            prevMau +=
              new Date(year, month - 2, 1, 0, 0, 0) <= new Date(post.createdAt) &&
              new Date(year, month - 1, 1, 0, 0, 0) > new Date(post.createdAt)
                ? 1
                : 0;
          }
        }

        setInfo({ dau, wau, mau, prevDau, prevWau, prevMau });
        setPostLength(postLength);
        setAvgPostByMonth(monthPostMap);
        // 글을 작성한 유저의 기록 평균
        // setAvgPostByUser(postLength / Object.keys(postsByUser).length);
      });
    },
    [profile, isClient],
  );

  useEffect(
    function setAvgPostByUserEffect() {
      // 모든 유저(미작성 유저 포함)의 기록 평균
      setAvgPostByUser(+(postLength / userData.length).toFixed(1));
    },
    [postLength, userData],
  );

  return (
    isAdmin && (
      <article className="flex flex-col gap-5">
        <section>
          <h3 className="font-sb18 mb-2">유저 유입량</h3>
          <div className="grid gap-4 grid-cols-3">
            <ActiveUserCard
              title="DAU"
              date={getFormatDate(new Date(), 'yyyy.MM.dd')}
              value={info.dau}
              accValue={info.dau - info.prevDau}
            />
            <ActiveUserCard
              title="WAU"
              date={`${getFormatDate(
                new Date(year, month - 1, date - (day === 0 ? 6 : day - 1), 0, 0, 0),
                'yyyy.MM.dd',
              )} ~ ${getFormatDate(new Date(), 'yyyy.MM.dd')}`}
              value={info.wau}
              accValue={info.wau - info.prevWau}
            />
            <ActiveUserCard
              title="MAU"
              date={`${getFormatDate(new Date(year, month - 1, 1, 0, 0, 0), 'yyyy.MM.dd')} ~ ${getFormatDate(new Date(), 'yyyy.MM.dd')}`}
              value={info.mau}
              accValue={info.mau - info.prevMau}
            />
          </div>
        </section>
        <section>
          <h3 className="font-sb18 mb-2">유저 데이터</h3>
          <div className="grid gap-4 grid-cols-2">
            <TotalCard title="전체 누적 유저수" value={userData.length} />
            <TotalCard
              title="오늘 회원가입 유저수"
              value={userData.filter(v => isTodayPost(v.createdAt)).length}
            />
          </div>
        </section>
        <section>
          <h3 className="font-sb18 mb-2">기록 데이터</h3>
          <div className="grid gap-4 grid-cols-3">
            <div className="flex flex-col gap-4">
              <TotalCard title="총 작성된 기록 수" value={postLength} />
              <TotalCard title="유저별 기록 평균 수" value={avgPostByUser} />
            </div>
            <Card className="w-full h-auto col-span-2">
              <CardHeader>
                <CardTitle className="font-r14">월별 평균 기록 수</CardTitle>
              </CardHeader>
              <CardContent className="font-sb24 w-[90%] mx-auto mt-4">
                <AvgPostChart data={avgPostByMonth} />
              </CardContent>
            </Card>
          </div>
        </section>
      </article>
    )
  );
};

export default TotalView;
