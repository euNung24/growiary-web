import { cn } from '@/shared/utils/cn';
import Chip from '@/shared/components/Chip';
import Image from 'next/image';
import { TopicType } from '@/domain/user/topic/type';
const TopicItem = (topic: TopicType) => {
  return (
    <li
      className={cn(
        'group px-6 py-4 rounded-md border border-gray-100 hover:bg-primary-900 hover:text-white-0',
      )}
    >
      <Image
        src="/assets/icons/edit_white.png"
        alt="icon"
        width={22}
        height={22}
        className="hidden	group-hover:inline-block group-hover:mr-3"
      />
      {topic.title}
      <Chip className="ml-3 group-hover:bg-gray-50 group-hover:text-gray-900">Best</Chip>
    </li>
  );
};

export default TopicItem;
