/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useCallback } from 'react';
import { Editor, Transforms, createEditor, Element } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

function DefaultElement(props) {
  return <p {...props.attributes}>{props.children}</p>;
}

function CodeElement(props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
}

function SlideEditor() {
  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable
        renderElement={renderElement}
        onKeyDown={(event) => {
          if (event.key === 'c' && event.ctrlKey && event.altKey) {
            // Prevent the "`" from being inserted by default.
            event.preventDefault();
            const [match] = Editor.nodes(editor, {
              match: (n) => n.type === 'code',
            });
            // Toggle the block type depending on whether there's already a match.
            Transforms.setNodes(
              editor,
              { type: match ? 'paragraph' : 'code' },
              {
                match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
              },
            );
          }
        }}
      />
    </Slate>
  );
}

export default SlideEditor;
