import React, { forwardRef, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './editor.css';
import Delta from 'quill-delta';

const ReactQuill = forwardRef<Quill, { defaultValue?: Delta }>(
  ({ defaultValue, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const defaultValueRef = useRef(defaultValue);
    const toolbarOptions = [
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
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
      [{ align: [] }],
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
      });

      ref && (ref.current = quill);

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
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
