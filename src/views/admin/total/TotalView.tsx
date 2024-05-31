import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TotalView = () => {
  return (
    <article className="flex flex-col gap-5">
      <section>
        <h3 className="font-sb18 mb-2">유저 유입량</h3>
        <div className="grid gap-4 grid-cols-3">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>DAU</CardTitle>
            </CardHeader>
            <CardContent>content</CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>WAU</CardTitle>
            </CardHeader>
            <CardContent>content</CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>MAU</CardTitle>
            </CardHeader>
            <CardContent>content</CardContent>
          </Card>
        </div>
      </section>
      <section>
        <h3 className="font-sb18 mb-2">유저 데이터</h3>
        <div className="grid gap-4 grid-cols-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>전체 누적 유저수</CardTitle>
            </CardHeader>
            <CardContent>content</CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>오늘 회원가입 유저수</CardTitle>
            </CardHeader>
            <CardContent>content</CardContent>
          </Card>
        </div>
      </section>
      <section>
        <h3 className="font-sb18 mb-2">기록 데이터</h3>
        <div className="grid gap-4 grid-cols-3">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>총 작성된 기록 수</CardTitle>
            </CardHeader>
            <CardContent>content</CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>총 유저별 기록 평균 수 n개</CardTitle>
            </CardHeader>
            <CardContent>content</CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                매달 작성된 평균 기록 수 (차트) → x축 월, y축을 평균 작성수
              </CardTitle>
            </CardHeader>
            <CardContent>content</CardContent>
          </Card>
        </div>
      </section>
    </article>
  );
};

export default TotalView;
