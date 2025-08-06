import MockQueryClientProvider from '@/user/mocks/components/MockQueryClientProvider';
import { fireEvent, render, within } from '@testing-library/react';
import useGetTopicsByCategory from '@user/topic/queries/useGetTopicsByCategory';
import useGetRecommendedTopic from '@user/topic/queries/useGetRecommendedTopic';
import TopicTabList from '@user/topic/components/TopicTabList/TopicTabList';
import { MOCK_TOPIC } from '@/user/mocks/data/topic';
import { TopicCategory } from '@user/topic/types/topic';

jest.mock('@user/topic/queries/useGetTopicsByCategory');
jest.mock('@user/topic/queries/useGetRecommendedTopic');

const mockedUseGetTopicsByCategory = useGetTopicsByCategory as jest.Mock;
const mockedUseGetRecommendedTopic = useGetRecommendedTopic as jest.Mock;

const renderComponent = () =>
  render(
    <MockQueryClientProvider>
      <TopicTabList />
    </MockQueryClientProvider>,
  );

describe('TopicTabList 컴포넌트', () => {
  beforeEach(() => {
    mockedUseGetTopicsByCategory.mockReturnValue({
      data: MOCK_TOPIC.TOPICS_BY_CATEGORY,
      isLoading: false,
      isError: false,
    });
  });

  it('탭 메뉴 렌더링', async () => {
    mockedUseGetRecommendedTopic.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    const screen = renderComponent();
    const tabs = screen.getAllByRole('tab');

    const filteredTabs = Object.keys(MOCK_TOPIC.TOPICS_BY_CATEGORY).filter(
      category => category !== '자유',
    );
    expect(tabs.length === filteredTabs.length).toBeTruthy();
  });

  it('로딩 상태에서 Skeleton을 렌더링한다', async () => {
    mockedUseGetRecommendedTopic.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    const screen = renderComponent();
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('탭 클릭 시 탭패널에 해당 주제 목록이 나타난다', () => {
    mockedUseGetRecommendedTopic.mockReturnValue({
      data: MOCK_TOPIC.RECOMMENDATION_TOPIC_BY_CATEGORY,
      isLoading: false,
      isError: false,
    });

    const screen = renderComponent();
    const tabs = screen.getAllByRole('tab');

    tabs.forEach(tab => {
      fireEvent.click(tab);

      const category = tab.getAttribute('data-category') as TopicCategory;
      const tabpanel = screen.getByRole('tabpanel');
      const links = within(tabpanel).getAllByRole('link');

      expect(links).toHaveLength(MOCK_TOPIC.TOPICS_BY_CATEGORY[category].length);
    });
  });

  it('추천 주제가 포함된 탭에서 "Best" 표시가 붙는다', () => {
    mockedUseGetRecommendedTopic.mockReturnValue({
      data: MOCK_TOPIC.RECOMMENDATION_TOPIC_BY_CATEGORY,
      isLoading: false,
      isError: false,
    });

    const screen = renderComponent();
    const tabs = screen.getAllByRole('tab');

    tabs.forEach(tab => {
      fireEvent.click(tab);

      const category = tab.getAttribute('data-category') as TopicCategory;
      const tabpanel = screen.getByRole('tabpanel');
      const links = within(tabpanel).getAllByRole('link');
      const bestLink = links.find(link => link.textContent?.includes('Best'));

      const recommendationTopic =
        MOCK_TOPIC.RECOMMENDATION_TOPIC_BY_CATEGORY[
          category as keyof typeof MOCK_TOPIC.RECOMMENDATION_TOPIC_BY_CATEGORY
        ];

      if (recommendationTopic?.title) {
        expect(bestLink).toBeInTheDocument();
        expect(bestLink?.textContent).toBe(recommendationTopic.title + 'Best');
      } else {
        expect(bestLink).toBeUndefined();
      }
    });
  });
});
