/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useCallback } from 'react';
import { Editor, createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

const CustomEditor = {
  isBoldMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, 'bold');
    } else {
      Editor.addMark(editor, 'bold', true);
    }
  },
};

function Leaf(props) {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  );
}

function SlideEditor() {
  const [editor] = useState(() => withReact(createEditor()));
  const initialText = 'A line of text in a paragraph.';

  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: initialText }],
    },
  ];

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <div>
        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}
        >
          Bold
        </button>
      </div>
      <Editable
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          // Bold
          if (event.key === 'b' && event.ctrlKey) {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }
        }}
      />
    </Slate>
  );
}

export default SlideEditor;
