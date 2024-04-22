import dynamic from 'next/dynamic';
import React from 'react';
import { Op } from 'quill-delta';

type QuillComponentProps = {
  defaultValue?: Op[] | { ops: Op[] };
};

const Editor = dynamic(
  async () => {
    const { default: QuillComponent } = await import('./ReactQuill');
    const { Delta } = await import('quill/core');
    const QuillA = ({ defaultValue }: QuillComponentProps) => {
      return <QuillComponent defaultValue={new Delta(defaultValue)} />;
    };
    return QuillA;
  },
  { loading: () => <div>...loading</div>, ssr: false },
);

export default Editor;
