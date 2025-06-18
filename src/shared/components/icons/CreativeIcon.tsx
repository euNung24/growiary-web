import { IconProps } from '@/shared/types/topicCategory';

const CreativeIcon = ({ color = '#8A9299', width = 24, height = 24 }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="7.58698" cy="7.6518" rx="5.08698" ry="5.08686" fill="current" />
      <ellipse cx="7.58698" cy="16.1303" rx="5.08698" ry="5.08686" fill="current" />
      <ellipse cx="16.9131" cy="7.6518" rx="5.08698" ry="5.08686" fill="current" />
      <ellipse cx="16.9131" cy="16.1303" rx="5.08698" ry="5.08686" fill="current" />
    </svg>
  );
};

export default CreativeIcon;
