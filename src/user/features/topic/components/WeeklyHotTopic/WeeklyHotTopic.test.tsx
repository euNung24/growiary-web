import { ROUTES } from '@/shared/constants/routes';
import MockQueryClientProvider from '@/user/mocks/components/MockQueryClientProvider';
import { MOCK_TOPIC } from '@/user/mocks/data/topic';
import { render, waitFor } from '@testing-library/react';
import RecommendedTopic from '@user/topic/components/WeeklyHotTopic/WeeklyHotTopic';
import useGetWeeklyHotTopic from '@user/topic/queries/useGetWeeklyHotTopic';

jest.mock('@user/topic/queries/useGetWeeklyHotTopic');

const mockedUseGetWeeklyHotTopic = useGetWeeklyHotTopic as jest.Mock;
const renderComponent = () =>
  render(
    <MockQueryClientProvider>
      <RecommendedTopic />
    </MockQueryClientProvider>,
  );

describe('WeeklyHotTopic 컴포넌트', () => {
  it('로딩 상태에서 Skeleton을 렌더링한다', async () => {
    mockedUseGetWeeklyHotTopic.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    const screen = renderComponent();
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('에러 상태에서 에러 메시지를 출력한다', async () => {
    mockedUseGetWeeklyHotTopic.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    const screen = renderComponent();
    await waitFor(() =>
      expect(screen.getByText('오류가 발생했습니다.')).toBeInTheDocument(),
    );
  });

  it('추천할 토픽이 없을 경우, 안내 메시지를 보여준다', async () => {
    mockedUseGetWeeklyHotTopic.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });

    const screen = renderComponent();
    await waitFor(() =>
      expect(screen.getByText('주간 인기 주제가 없습니다.')).toBeInTheDocument(),
    );
  });

  it('정상 데이터가 있으면 주간 인기 토픽을 보여준다', async () => {
    mockedUseGetWeeklyHotTopic.mockReturnValue({
      data: MOCK_TOPIC.HOT_TOPIC,
      isLoading: false,
      isError: false,
    });

    const screen = renderComponent();
    const { topic, users, count } = MOCK_TOPIC.HOT_TOPIC;

    await waitFor(() => {
      expect(screen.getByText(topic.title)).toBeInTheDocument();
      expect(
        screen.getByText(`그루어리 사용자 ${users}명이 평균 ${count}회 작성한 주제`),
      ).toBeInTheDocument();

      const link = screen.getByRole('link', { name: /이 주제로 기록하기/ });
      expect(link).toHaveAttribute(
        'href',
        ROUTES.post.newFilter({ topic: topic.id, category: topic.category }),
      );
    });
  });
});
