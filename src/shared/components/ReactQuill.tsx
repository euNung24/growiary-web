/* eslint-disable @typescript-eslint/ban-ts-comment */
import { forwardRef, useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import './editor.css';
import Delta from 'quill-delta';
import { ControllerRenderProps } from 'react-hook-form';
import { cn } from '@/shared/utils/cn';
// @ts-expect-error
import QuillMarkdown from 'quilljs-markdown';
import 'quilljs-markdown/dist/quilljs-markdown-common-style.css';

type ReactQuillProps = {
  defaultValue?: Delta | string;
  placeholder?: string;
  template?: string;
  events?: {
    handleContentChange: ControllerRenderProps['onChange'];
    handleCountChange: ControllerRenderProps['onChange'];
    handleMount: () => void;
  };
  readonly: boolean;
};

const ReactQuill = forwardRef<Quill, ReactQuillProps>(
  ({ defaultValue, placeholder, readonly, events, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const placeholderContainerRef = useRef<HTMLDivElement | null>(null);
    const [quill, setQuill] = useState<Quill | null>(null);

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

    useEffect(
      function setInitQuillEditor() {
        if (typeof ref === 'function' || !containerRef.current) {
          return;
        }

        const container = containerRef.current;
        const editorContainer = container!.appendChild(
          container.ownerDocument.createElement('div'),
        );
        const quillInstance = new Quill(editorContainer, {
          modules: {
            toolbar: toolbarOptions,
          },
          theme: 'snow',
          readOnly: readonly,
        });
        setQuill(quillInstance);
        new QuillMarkdown(quillInstance, {});

        return () => {
          ref && (ref.current = null);
          container.innerHTML = '';
        };
      },
      [ref],
    );

    useEffect(
      function setEditorEvents() {
        if (!quill) return;

        quill.once('text-change', () => {
          placeholderContainerRef.current!.style.display = 'none';
        });

        quill.on('text-change', delta => {
          const condition =
            delta.ops[0]?.delete ||
            (delta.ops[0]?.insert === '\n' && delta.ops[1]?.delete);
          if (condition) {
            placeholderContainerRef.current!.style.display = 'block';
          } else if (placeholderContainerRef.current!.style.display === 'block') {
            placeholderContainerRef.current!.style.display = 'none';
          }

          if (quill.getLength() > 2000) {
            alert('2000자 이내의 글만 작성할 수 있습니다.');
            quill.deleteText(1999, quill.getLength());
          }

          events && events.handleContentChange(quill.getContents());
          events &&
            events.handleCountChange(
              condition ? quill.getLength() - 1 : quill.getLength(),
            );
        });
      },
      [quill],
    );

    useEffect(
      function setInitTextOrPlaceholder() {
        if (!quill) return;

        // placeholder 세팅
        if (placeholderContainerRef.current) {
          if (placeholder) {
            placeholderContainerRef.current.style.display = 'none';
            quill.clipboard.dangerouslyPasteHTML(placeholder);
          } else {
            placeholderContainerRef.current.innerHTML = `<p>자유롭게 작성할 수 있어요.</p>`;
          }
        }

        if (defaultValue) {
          if (typeof defaultValue === 'string') {
            quill.clipboard.dangerouslyPasteHTML(defaultValue);
          } else {
            quill.setContents(defaultValue);
          }
        }

        events && events.handleMount();
      },
      [quill, placeholder],
    );

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
