'use client';

import RecentTopic from '@user/topic/components/RecentTopic/RecentTopic';
import WeeklyHotTopic from '@user/topic/components/WeeklyHotTopic/WeeklyHotTopic';
import TopicTabList from '@user/topic/components/TopicTabList/TopicTabList';

const TopicView = () => {
  return (
    <>
      <section>
        <h2 className="title">다채로운 질문들을 만나보세요</h2>
        <div className="flex flex-wrap gap-5 mt-6 [&>*]:flex-[1_0_460px] sm:[&>*]:shrink">
          <WeeklyHotTopic />
          <RecentTopic />
        </div>
      </section>
      <hr className="border-gray-100 mt-[46px] mb-6" />
      <TopicTabList />
    </>
  );
};

export default TopicView;
