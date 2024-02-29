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
    let string = escapeHtml(node.text).replace(/\n/g, '<br>');

    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }

    if (node.info) {
      string = `<span class="info">${string}</span>`;
    }

    if (node.disabled) {
      string = `<span class="disabled">${string}</span>`;
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

  // Gérer les informations de mise en forme
  if (el.classList.contains('info')) {
    nodeAttributes.info = true;
  }

  if (el.classList.contains('disabled')) {
    nodeAttributes.disabled = true;
  }

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

  // span info
  toggleInfoMark(editor) {
    const isActive = CustomEditor.isInfoMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, 'info');
    } else {
      Editor.addMark(editor, 'info', true);
    }
  },

  isInfoMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.info === true : false;
  },

  // span disabled
  isDisabledMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.disabled === true : false;
  },

  toggleDisabledMark(editor) {
    const isActive = CustomEditor.isDisabledMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, 'disabled');
    } else {
      Editor.addMark(editor, 'disabled', true);
    }
  },
};

function Leaf(props) {
  let className = '';
  if (props.leaf.info) {
    className += 'info ';
  }
  if (props.leaf.disabled) {
    className += 'disabled ';
  }

  return (
    <span
      {...props.attributes}
      className={className}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  );
}

function SlideEditor({ contentValue, handleChange }) {
  const [editor] = useState(() => withReact(createEditor()));

  const convertedText = deserialize(
    new DOMParser().parseFromString(contentValue, 'text/html').body,
  );

  const initialValue = [
    {
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
          handleChange(serialize(value));
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
        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleInfoMark(editor);
          }}
        >
          Info
        </button>
        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleDisabledMark(editor);
          }}
        >
          Désactivé
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
