import Image from 'next/image';
import Link from 'next/link';

import Chip from '@/shared/components/Chip';
import { TopicType } from '@user/topic/types/topic';
import { memo } from 'react';

type TopicItemProps = {
  topic: TopicType;
  best: boolean;
};

const TopicItem = ({ topic, best }: TopicItemProps) => {
  return (
    <li className="group rounded-md hover:bg-primary-900 border border-gray-100 hover:shadow">
      <Link
        href={`/post?topic=${topic.id}&category=${topic.category}`}
        className="px-6 py-4 font-r16 inline-block text-gray-700 group-hover:text-white-0 transition-colors duration-150"
      >
        <Image
          src="/assets/icons/edit_white.png"
          alt="icon"
          width={22}
          height={22}
          className="hidden	group-hover:inline-block group-hover:mr-3"
        />
        {topic.title.replaceAll('/n ', '')}
        {best && (
          <Chip className="ml-3 font-r12 group-hover:bg-gray-50 group-hover:text-gray-900">
            Best
          </Chip>
        )}
      </Link>
    </li>
  );
};

export default memo(TopicItem);
