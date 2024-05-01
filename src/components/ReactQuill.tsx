import React, { forwardRef, useEffect, useRef } from 'react';
import Quill from 'quill';
import './editor.css';
import Delta from 'quill-delta';
import { ControllerRenderProps } from 'react-hook-form';

type ReactQuillProps = {
  defaultValue?: Delta | string;
  placeholder?: string;
  events: {
    handleContentChange: ControllerRenderProps['onChange'];
    handleCountChange: ControllerRenderProps['onChange'];
  };
};

const ReactQuill = forwardRef<Quill, ReactQuillProps>(
  ({ defaultValue, placeholder, events, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const defaultValueRef = useRef(defaultValue);
    const toolbarOptions = [
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
      [{ align: [] }],
      [
        {
          color: [
            'black',
            'gray',
            'red',
            'orange',
            'yellow',
            'green',
            'blue',
            'indigo',
            'purple',
          ],
        },
      ],
    ];

    useEffect(() => {
      if (typeof ref === 'function' || !containerRef.current) {
        return;
      }

      const container = containerRef.current;
      const editorContainer = container!.appendChild(
        container.ownerDocument.createElement('div'),
      );
      const quill = new Quill(editorContainer, {
        modules: {
          toolbar: toolbarOptions,
        },
        placeholder: placeholder,
        theme: 'snow',
      });

      quill.on('text-change', () => {
        events.handleContentChange(quill.getContents());

        if (quill.getLength() > 2000) {
          alert('2000자 이내의 글만 작성할 수 있습니다.');
          quill.deleteText(1999, quill.getLength());
        }

        events.handleCountChange(quill.getLength());
      });

      ref && (ref.current = quill);

      if (defaultValueRef.current) {
        if (typeof defaultValueRef.current === 'string') {
          quill.clipboard.dangerouslyPasteHTML(defaultValueRef.current);
        } else {
          quill.setContents(defaultValueRef.current);
        }
      }

      return () => {
        ref && (ref.current = null);
        container.innerHTML = '';
      };
    }, [ref]);

    return <div ref={containerRef} {...props}></div>;
  },
);

ReactQuill.displayName = 'ReactQuill';

export default ReactQuill;
