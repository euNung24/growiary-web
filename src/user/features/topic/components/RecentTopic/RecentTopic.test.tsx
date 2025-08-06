import MockQueryClientProvider from '@/user/mocks/components/MockQueryClientProvider';
import { render, waitFor } from '@testing-library/react';
import RecentTopic from '@user/topic/components/RecentTopic/RecentTopic';
import useGetUserRecentTopic from '@user/topic/queries/useGetUserRecentTopic';
import useGetProfile from '@/shared/queries/profile/useGetProfile';
import { MOCK_PROFILE } from '@/user/mocks/data/profile';
import { MOCK_TOPIC } from '@/user/mocks/data/topic';

jest.mock('@/shared/queries/profile/useGetProfile');
jest.mock('@user/topic/queries/useGetUserRecentTopic');

const mockedUseGetProfile = useGetProfile as jest.Mock;
const mockedUseGetUserRecentTopic = useGetUserRecentTopic as jest.Mock;

const renderComponent = () =>
  render(
    <MockQueryClientProvider>
      <RecentTopic />
    </MockQueryClientProvider>,
  );

describe('RecentTopic 컴포넌트 미로그인 유저', () => {
  it('예시 카드 렌더링', async () => {
    mockedUseGetProfile.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });
    mockedUseGetUserRecentTopic.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });

    const screen = renderComponent();
    const button = screen.getByRole('button');

    expect(button.textContent).toBe('로그인하고 내 기록 확인하기');
  });
});

describe('RecentTopic 컴포넌트 로그인 유저', () => {
  beforeEach(() => {
    mockedUseGetProfile.mockReturnValue({
      data: MOCK_PROFILE,
      isLoading: false,
      isError: false,
    });
  });

  it('로딩 상태에서 Skeleton을 렌더링한다', async () => {
    mockedUseGetUserRecentTopic.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    const screen = renderComponent();
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('에러 상태에서 에러 메시지를 출력한다', async () => {
    mockedUseGetUserRecentTopic.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    const screen = renderComponent();

    await waitFor(() =>
      expect(screen.getByText('오류가 발생했습니다.')).toBeInTheDocument(),
    );
  });

  it('추천할 토픽이 없을 경우, 자유 주제를 보여준다', async () => {
    mockedUseGetUserRecentTopic.mockReturnValue({
      data: {},
      isLoading: false,
      isError: false,
    });

    const screen = renderComponent();

    await waitFor(() => {
      const link = screen.getByRole('link');

      expect(link.textContent).toBe('자유주제로 기록하기');
    });
  });

  it('정상 데이터가 있고, day가 2 이상일 때 "n일 전에" 문구와 함께 최근 주제를 보여준다', async () => {
    mockedUseGetUserRecentTopic.mockReturnValue({
      data: MOCK_TOPIC.RECENT_TOPIC,
      isLoading: false,
      isError: false,
    });

    const screen = renderComponent();
    const { topic, day } = MOCK_TOPIC.RECENT_TOPIC;
    const { nickname } = MOCK_PROFILE;

    await waitFor(() => {
      const link = screen.getByRole('link');

      expect(link.textContent).toBe('이 주제로 기록하기');
      expect(screen.getByText(topic.category)).toBeInTheDocument();
      expect(
        screen.getByText(`${nickname}님이 ${day}일 전에 기록한 주제`),
      ).toBeInTheDocument();
    });
  });

  it('정상 데이터가 있고, day가 1일 때 "하루 전에" 문구와 함께 최근 주제를 보여준다', async () => {
    mockedUseGetUserRecentTopic.mockReturnValue({
      data: {
        ...MOCK_TOPIC.RECENT_TOPIC,
        day: 1,
      },
      isLoading: false,
      isError: false,
    });

    const screen = renderComponent();
    const { nickname } = MOCK_PROFILE;

    await waitFor(() => {
      const link = screen.getByRole('link');

      expect(link.textContent).toBe('이 주제로 기록하기');
      expect(
        screen.getByText(`${nickname}님이 하루 전에 기록한 주제`),
      ).toBeInTheDocument();
    });
  });

  it('정상 데이터가 있고, day가 0일 때 "오늘" 문구와 함께 최근 주제를 보여준다', async () => {
    mockedUseGetUserRecentTopic.mockReturnValue({
      data: {
        ...MOCK_TOPIC.RECENT_TOPIC,
        day: 0,
      },
      isLoading: false,
      isError: false,
    });

    const screen = renderComponent();
    const { nickname } = MOCK_PROFILE;

    await waitFor(() => {
      const link = screen.getByRole('link');

      expect(link.textContent).toBe('이 주제로 기록하기');
      expect(screen.getByText(`${nickname}님이 오늘 기록한 주제`)).toBeInTheDocument();
    });
  });
});
