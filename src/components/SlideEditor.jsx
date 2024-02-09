/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useCallback } from 'react';
import { Editor, createEditor, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { jsx } from 'slate-hyperscript';
import escapeHtml from 'escape-html';

const serializeNodeToHtml = (node) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    return string;
  }

  const children = node.children.map((n) => serializeNodeToHtml(n)).join('');

  switch (node.type) {
    case 'quote':
      return `<blockquote>${children}</blockquote>`;
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'link':
      return `<a href="${escapeHtml(node.url)}">${children}</a>`;
    default:
      return children;
  }
};

const serialize = (nodes) =>
  nodes.map((node) => serializeNodeToHtml(node)).join('\n');

const deserialize = (el, markAttributes = {}) => {
  if (el.nodeType === Node.TEXT_NODE) {
    return jsx('text', markAttributes, el.textContent);
  }
  if (el.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const nodeAttributes = { ...markAttributes };

  // Define attributes for different types of elements
  switch (el.nodeName) {
    case 'STRONG':
      nodeAttributes.bold = true;
      break;
    default:
      break;
  }

  const children = Array.from(el.childNodes)
    .map((node) => deserialize(node, nodeAttributes))
    .flat();

  if (children.length === 0) {
    children.push(jsx('text', nodeAttributes, ''));
  }

  switch (el.nodeName) {
    case 'BODY':
      return jsx('fragment', {}, children);
    case 'BR':
      return '\n';
    case 'BLOCKQUOTE':
      return jsx('element', { type: 'quote' }, children);
    case 'P':
      return jsx('element', { type: 'paragraph' }, children);
    case 'A':
      return jsx(
        'element',
        { type: 'link', url: el.getAttribute('href') },
        children,
      );
    default:
      return children;
  }
};

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
  const initialText = 'A line of <strong>text</strong> in a paragraph.';
  const convertedText = deserialize(
    new DOMParser().parseFromString(initialText, 'text/html').body,
  );

  const initialValue = [
    {
      type: 'paragraph',
      children: convertedText,
    },
  ];

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => op.type !== 'set_selection',
        );
        if (isAstChange) {
          console.log(serialize(value));
        }
      }}
    >
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
