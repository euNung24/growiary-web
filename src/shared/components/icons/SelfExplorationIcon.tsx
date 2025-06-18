import { IconProps } from '@/shared/types/topicCategory';

const SelfExplorationIcon = ({
  color = '#8A9299',
  width = 24,
  height = 24,
}: IconProps) => {
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
        d="M1.14355 8.57116C1.14355 9.93635 2.5649 11.1618 4.81851 11.9994C2.5649 12.837 1.14355 14.0624 1.14355 15.4276C1.14355 17.9521 6.00417 19.9987 12 19.9987C17.9959 19.9987 22.8565 17.9521 22.8565 15.4276C22.8565 14.0624 21.4352 12.837 19.1816 11.9994C21.4352 11.1618 22.8565 9.93635 22.8565 8.57116C22.8565 6.04658 17.9959 4 12 4C6.00417 4 1.14355 6.04658 1.14355 8.57116ZM6.89106 12.0002C6.89106 13.411 9.17841 14.5546 12 14.5546C14.8216 14.5546 17.1089 13.411 17.1089 12.0002C17.1089 10.5894 14.8216 9.44571 12 9.44571C9.17841 9.44571 6.89106 10.5894 6.89106 12.0002Z"
        fill="current"
      />
    </svg>
  );
};

export default SelfExplorationIcon;
