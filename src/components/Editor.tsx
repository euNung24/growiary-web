import dynamic from 'next/dynamic';
import React from 'react';
import Delta, { Op } from 'quill-delta';
import { ControllerRenderProps } from 'react-hook-form';

type QuillComponentProps = {
  defaultValue?: string | { ops: Op[] };
  placeholder?: string;
  events?: {
    handleContentChange: ControllerRenderProps['onChange'];
    handleCountChange: ControllerRenderProps['onChange'];
  };
  className: string;
  readonly?: boolean;
};

const Editor = dynamic(
  async () => {
    const { default: QuillComponent } = await import('./ReactQuill');
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
