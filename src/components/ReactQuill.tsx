import React, { forwardRef, useEffect, useRef } from 'react';
import Quill from 'quill';
import './editor.css';
import Delta from 'quill-delta';
import { ControllerRenderProps } from 'react-hook-form';
import { cn } from '@/lib/utils';

type ReactQuillProps = {
  defaultValue?: Delta | string;
  placeholder?: string;
  events?: {
    handleContentChange: ControllerRenderProps['onChange'];
    handleCountChange: ControllerRenderProps['onChange'];
  };
  readonly: boolean;
};

const ReactQuill = forwardRef<Quill, ReactQuillProps>(
  ({ defaultValue, placeholder, readonly, events, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const placeholderContainerRef = useRef<HTMLDivElement | null>(null);

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
        theme: 'snow',
        readOnly: readonly,
      });
      quill.scroll;

      quill.scrollSelectionIntoView();

      // placeholder 세팅
      if (placeholder) {
        quill.clipboard.dangerouslyPasteHTML(placeholder);
        placeholderContainerRef.current!.innerHTML = quill.root.innerHTML;
        quill.deleteText(0, quill.getLength());
      }

      quill.once('text-change', () => {
        placeholderContainerRef.current!.style.display = 'none';
      });

      quill.on('text-change', delta => {
        if (Object.keys(delta.ops[0])?.[0] === 'delete' && placeholder) {
          placeholderContainerRef.current!.style.display = 'block';
        } else if (placeholderContainerRef.current!.style.display === 'block') {
          placeholderContainerRef.current!.style.display = 'none';
        }

        if (quill.getLength() > 2000) {
          alert('2000자 이내의 글만 작성할 수 있습니다.');
          quill.deleteText(1999, quill.getLength());
        }

        events && events.handleContentChange(quill.getContents());
        events && events.handleCountChange(quill.getLength());
      });

      ref && (ref.current = quill);

      if (defaultValue) {
        if (typeof defaultValue === 'string') {
          quill.clipboard.dangerouslyPasteHTML(defaultValue);
        } else {
          quill.setContents(defaultValue);
        }
      }

      return () => {
        ref && (ref.current = null);
        container.innerHTML = '';
      };
    }, [ref, placeholder]);

    return (
      <>
        <div
          ref={containerRef}
          {...props}
          className={cn(
            'h-full border-0',
            readonly &&
              '[&>.ql-toolbar]:hidden h-[calc(100%+46px)] border-t-0 border-gray-[#ccc] border-l-0 border-r-0 overflow-auto',
          )}
        ></div>
        <div
          className="ql-container ql-snow top-[43.37px] left-[5px] sm:top-[68px]"
          style={{
            position: 'absolute',
            // top: '43.37px',
            // left: '5px',
            border: 'none',
            pointerEvents: 'none',
          }}
        >
          <div
            className="ql-editor"
            style={{
              color: 'rgba(0, 0, 0, 0.6)',
            }}
            ref={placeholderContainerRef}
          ></div>
        </div>
      </>
    );
  },
);

ReactQuill.displayName = 'ReactQuill';

export default ReactQuill;
