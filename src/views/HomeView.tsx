import { Card, CardChip, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HomeView = () => {
  const headerStyle = 'font-sb18 text-primary-900';
  const headerDescriptionStyle = 'font-r16 text-gray-700 mt-1 mb-6';

  return (
    <>
      <section>
        <h2 className={headerStyle}>기록 리포트</h2>
        <p className={headerDescriptionStyle}>작성해주신 기록을 그루어리가 분석했어요</p>
        <div className="flex gap-5">
          {[...Array(3)].map((v, i) => (
            <Card key={i} className="shrink-0">
              i
            </Card>
          ))}
        </div>
      </section>
      <section>
        <h2 className={headerStyle}>오늘의 추천 주제</h2>
        <p className={headerDescriptionStyle}>추천 주제로 기록을 쉽게 시작해보세요</p>
        <div className="flex gap-5">
          {[...Array(3)].map((v, i) => (
            <Card
              key={i}
              className="shrink-0"
              variant={`${i === 0 ? 'primary' : 'default'}`}
            >
              <CardHeader>
                <CardTitle>타이틀 텍스트</CardTitle>
              </CardHeader>
              <CardContent>
                보조텍스트 작성 영역
                <br />
                보조텍스트 작성 영역
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section>
        <h2 className={headerStyle}>나의 기록</h2>
        <p className={headerDescriptionStyle}>오늘의 기록을 작성해주세요</p>
        <div className="flex gap-5">
          {[...Array(3)].map((v, i) => (
            <Card
              key={i}
              className="shrink-0"
              size="lg"
              variant={`${i === 0 ? 'primary' : 'default'}`}
            >
              <CardHeader>
                <CardChip>No.{i}</CardChip>
                <CardTitle>제목 타이틀</CardTitle>
              </CardHeader>
              <CardContent>
                내용 텍스트입니다.내용 텍스트입니다.내용 텍스트입니다.내용
                텍스트입니다.내용 텍스트입니다.내용 텍스트입니다.내용 텍스트입니다.내용
                텍스트입니다.내용 텍스트입니다.
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomeView;
