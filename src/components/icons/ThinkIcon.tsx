import { IconProps } from '@/utils/topicCategory';

const ThinkIcon = ({ color = '#8A9299', width = 24, height = 24 }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="5.05745" cy="12.0736" rx="4.91097" ry="7.19106" fill="current" />
      <ellipse cx="12.0731" cy="12.0736" rx="4.91097" ry="7.19106" fill="current" />
      <ellipse cx="19.0887" cy="12.0736" rx="4.91097" ry="7.19106" fill="current" />
    </svg>
  );
};

export default ThinkIcon;
