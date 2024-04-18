'use client';

import { useRef } from 'react';
import Editor from '@/components/Editor';
import { Delta } from 'quill/core';

const PostView = () => {
  const quillRef = useRef(null);
  const ops = [
    { insert: 'Keep', attributes: { bold: true } },
    { insert: '\n', attributes: { header: 2 } },
    { insert: '현재 만족하고 있는 부분' },
    { insert: '\n', attributes: { list: 'bullet' } },
    { insert: '계속 이어갔으면 하는 부분' },
    { insert: '\n', attributes: { list: 'bullet' } },
    { insert: 'Problem', attributes: { bold: true } },
    { insert: '\n', attributes: { header: 2 } },
    { insert: '현재 만족하고 있는 부분' },
    { insert: '\n', attributes: { list: 'bullet' } },
    { insert: '계속 이어갔으면 하는 부분' },
    { insert: '\n', attributes: { list: 'bullet' } },
  ];

  return (
    <form>
      <input type="text" placeholder="제목을 입력하세요" />
      <div>
        <label htmlFor="date">날짜</label>
        <input type="date" id="date" />
      </div>
      <div>
        <input type="text" id="태그" />
      </div>
      <Editor ref={quillRef} defaultValue={new Delta(ops)} />
    </form>
  );
};

export default PostView;
