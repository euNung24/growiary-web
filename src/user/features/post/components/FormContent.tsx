import { Controller, useFormContext } from 'react-hook-form';

import { topicCategory } from '@/shared/types/topicCategory';

import Editor from '@/user/features/post/components/Editor';
import { TopicCategory } from '@/user/features/topic/types/topic';
import useGetTopicsByCategory from '@user/topic/queries/useGetTopicsByCategory';

const FormContent = () => {
  const methods = useFormContext();
  const { data: topics } = useGetTopicsByCategory();

  const [category, topicIdValue] = methods.watch(['category', 'topicId']);

  const selectedTopic = topics?.[category as TopicCategory]?.find(
    topic => topic.id === +topicIdValue,
  );

  return (
    <div className="relative flex-1 mb-4 border border-[#ccc] rounded-xl overflow-hidden mt-[15px]">
      <Controller
        name="charactersCount"
        render={({ field: countField }) => (
          <Controller
            name="content"
            render={({ field: contentField }) => (
              <Editor
                placeholder={selectedTopic?.content}
                className="flex flex-col h-full"
                defaultValue={contentField.value}
                events={{
                  handleContentChange: contentField.onChange,
                  handleCountChange: countField.onChange,
                  handleMount: () => {
                    methods.setFocus('title');
                  },
                }}
              />
            )}
          />
        )}
      />
      {category && (
        <div className="absolute bottom-0 right-0 max-w-[314px] max-h-[314px] pr-2 h-[50%] z-[-1]">
          {topicCategory[category as TopicCategory]?.Icon({
            width: '100%',
            height: '100%',
            color: '#EEF9E6',
          })}
        </div>
      )}
    </div>
  );
};

export default FormContent;
