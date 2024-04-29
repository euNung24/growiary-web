import dynamic from 'next/dynamic';
import React from 'react';
import { Op } from 'quill-delta';
import { ControllerRenderProps } from 'react-hook-form';

type QuillComponentProps = {
  defaultValue?: string | { ops: Op[] };
  events: {
    handleContentChange: ControllerRenderProps['onChange'];
    handleCountChange: ControllerRenderProps['onChange'];
  };
  className: string;
};

const Editor = dynamic(
  async () => {
    const { default: QuillComponent } = await import('./ReactQuill');
    const { Delta } = await import('quill/core');
    const Quill = ({ defaultValue, events, ...props }: QuillComponentProps) => {
      return (
        <QuillComponent
          {...props}
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
