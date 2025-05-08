import { IconProps } from '@/shared/utils/topicCategory';

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
        d="M21.0002 12.0709C21.0003 12.0555 21.0002 12.0401 21.0002 12.0247C21.0002 7.05413 16.9707 3.02466 12.0001 3.02466C7.02951 3.02466 3.00004 7.05413 3.00004 12.0247C3.00004 12.0401 2.99995 12.0555 3.00004 12.0709H21.0002Z"
        fill="current"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.0002 20.5799C21.0003 20.5645 21.0002 20.5492 21.0002 20.5338C21.0002 15.5632 16.9707 11.5337 12.0001 11.5337C7.02951 11.5337 3.00004 15.5632 3.00004 20.5338C3.00004 20.5492 2.99995 20.5645 3.00004 20.5799H21.0002Z"
        fill="#current"
      />
    </svg>
  );
};

export default RemembranceIcon;
