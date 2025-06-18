import React from 'react';
import dynamic from 'next/dynamic';

import Delta, { Op } from 'quill-delta';
import { ControllerRenderProps } from 'react-hook-form';

type QuillComponentProps = {
  defaultValue?: string | { ops: Op[] };
  placeholder?: string;
  events?: {
    handleContentChange: ControllerRenderProps['onChange'];
    handleCountChange: ControllerRenderProps['onChange'];
    handleMount: () => void;
  };
  className?: string;
  readonly?: boolean;
};

const Editor = dynamic(
  async () => {
    const { default: QuillComponent } = await import('@user/post/components/ReactQuill');
    const Quill = ({
      defaultValue,
      placeholder,
      events,
      readonly = false,
      ...props
    }: QuillComponentProps) => {
      return (
        <QuillComponent
          {...props}
          placeholder={placeholder}
          events={events}
          readonly={readonly}
          defaultValue={
            typeof defaultValue === 'string' || typeof defaultValue == 'undefined'
              ? defaultValue
              : new Delta(defaultValue)
          }
        />
      );
    };
    return Quill;
  },
  { loading: () => <div>...loading</div>, ssr: false },
);

export default Editor;
