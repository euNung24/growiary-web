import dynamic from 'next/dynamic';
import React from 'react';
import { Op } from 'quill-delta';

type QuillComponentProps = {
  defaultValue?: Op[] | { ops: Op[] };
  className: string;
};

const Editor = dynamic(
  async () => {
    const { default: QuillComponent } = await import('./ReactQuill');
    const { Delta } = await import('quill/core');
    const Quill = ({ defaultValue, ...props }: QuillComponentProps) => {
      return <QuillComponent {...props} defaultValue={new Delta(defaultValue)} />;
    };
    return Quill;
  },
  { loading: () => <div>...loading</div>, ssr: false },
);

export default Editor;
