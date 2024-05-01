import dynamic from 'next/dynamic';
import React from 'react';
import Delta, { Op } from 'quill-delta';
import { ControllerRenderProps } from 'react-hook-form';

type QuillComponentProps = {
  defaultValue?: string | { ops: Op[] };
  placeholder?: string;
  events: {
    handleContentChange: ControllerRenderProps['onChange'];
    handleCountChange: ControllerRenderProps['onChange'];
  };
  className: string;
};

const Editor = dynamic(
  async () => {
    const { default: QuillComponent } = await import('./ReactQuill');
    const Quill = ({
      defaultValue,
      placeholder,
      events,
      ...props
    }: QuillComponentProps) => {
      return (
        <QuillComponent
          {...props}
          placeholder={placeholder}
          events={events}
          defaultValue={
            typeof defaultValue === 'string' ? defaultValue : new Delta(defaultValue)
          }
        />
      );
    };
    return Quill;
  },
  { loading: () => <div>...loading</div>, ssr: false },
);

export default Editor;
