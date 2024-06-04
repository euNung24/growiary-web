import * as React from 'react';
import { ReactNode } from 'react';

type FilterBoxProps = {
  label: string;
  children: ReactNode;
};
const FilterBox = ({ label, children }: FilterBoxProps) => {
  return (
    <div className="flex gap-2 items-center">
      <span className="basis-28">{label}</span>
      {children}
    </div>
  );
};

export default FilterBox;
