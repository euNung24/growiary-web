import { IconProps } from '@/utils/topicCategory';

const RemembranceIcon = ({ color = '#002861', width = 24, height = 24 }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.9998 12.1008C21.9999 12.0837 21.9998 12.0667 21.9998 12.0495C21.9998 6.52678 17.5227 2.04968 11.9999 2.04968C6.47714 2.04968 2.00004 6.52678 2.00004 12.0495C2.00004 12.0667 1.99994 12.0837 2.00004 12.1008H21.9998Z"
        fill="current"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.9998 21.555C21.9999 21.5379 21.9998 21.5209 21.9998 21.5038C21.9998 15.981 17.5227 11.5039 11.9999 11.5039C6.47714 11.5039 2.00004 15.981 2.00004 21.5038C2.00004 21.5209 1.99994 21.5379 2.00004 21.555H21.9998Z"
        fill="current"
      />
    </svg>
  );
};

export default RemembranceIcon;
