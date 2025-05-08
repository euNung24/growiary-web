import Editor from '@/shared/components/Editor';
import { TopicCategory, TopicType } from '@/domain/user/topic/type';
import { topicCategory } from '@/shared/utils/topicCategory';
import { Controller, useFormContext } from 'react-hook-form';

type FormContentProps = {
  selectedTopic?: TopicType;
};

const FormContent = ({ selectedTopic }: FormContentProps) => {
  const methods = useFormContext();
  const category = methods.watch('category');

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
