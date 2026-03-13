
import {
  BaseEditor,
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
  Node,
  Text,
  Descendant,
} from 'slate'
import { Slate, Editable, withReact, useSlate } from 'slate-react'
import { ReactEditor } from 'slate-react'
import { ReactNode, useCallback, useMemo, useState } from 'react';
import { BoldOutlined, ItalicOutlined, OrderedListOutlined, UnderlineOutlined, UnorderedListOutlined } from '@ant-design/icons';

export type CustomEditor = BaseEditor & ReactEditor

export type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}

export type HeadingElement = {
  type: 'heading'
  level: number
  children: CustomText[]
}

export type CustomElement = ParagraphElement | HeadingElement
export type FormattedText = { text: string; bold?: boolean, italic?: boolean, underline?: boolean }

export type CustomText = FormattedText


declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}
const EMPTY: Descendant[] = [{ type: 'paragraph', children: [{ text: '' }] }];
// Add the initial value.
// const initialValue: Descendant[] = [
//   {
//     type: 'paragraph',
//     children: [{ text: 'A line of text in a paragraph.' }],
//   },
// ]

const LIST_TYPES = ['numbered-list', 'bulleted-list']
interface SlateNoteEditorProp {
  updateValue: any,
  insertValue?: Descendant[],
}

export const SlateNoteEditor = ({ updateValue, insertValue = EMPTY }: SlateNoteEditorProp) => {
  const [value, setValue] = useState<Descendant[]>(insertValue);
  const renderElement = useCallback((props: any) => <Element {...props} />, [])
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, [])
  const editor = useMemo(() => withReact(createEditor()), [])



  return (
    <Slate editor={editor} value={value} onChange={value => {
      setValue(value)
      updateValue(value)
    }}>
      <div className='flex flex-row flex-wrap gap-1' >
        <BlockButton format="heading-one" icon="H1" />
        <BlockButton format="heading-two" icon="H2" />
        <MarkButton format="bold" icon={<BoldOutlined />} />
        <MarkButton format="italic" icon={<ItalicOutlined />} />
        <MarkButton format="underline" icon={<UnderlineOutlined />} />
        <BlockButton format="numbered-list" icon={<OrderedListOutlined />} />
        <BlockButton format="bulleted-list" icon={<UnorderedListOutlined />} />
      </div>
      <Editable
        className=' mt-2 p-2 border-[1px] border-desaturated-grey rounded-md '
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter your note here…"
        spellCheck
        autoFocus
      />
    </Slate>
  )
}

const toggleBlock = (editor: CustomEditor, format: any) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => SlateElement.isElement(n) && LIST_TYPES.includes(n.type),
    split: true
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format
  });

  if (!isActive && isList) {
    const block: CustomElement = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor: CustomEditor, format: any) => {
  const isActive = isMarkActive(editor, format)
  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor: CustomEditor, format: string) => {

  const [match] = Editor.nodes(editor, {
    match: (n) => {
      return Editor.isBlock(editor, n) && n.type === format
    }
  });

  return !!match;
};


const isMarkActive = (editor: CustomEditor, format: string) => {
  const marks = Editor.marks(editor)
  switch (format) {
    case "bold":
      return marks?.bold ? true : false
    case "italic":
      return marks?.italic ? true : false
    case "underline":
      return marks?.underline ? true : false
    default:
      return false
  }
}

const Leaf = ({ attributes, children, leaf }: any) => {

  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const Element = ({ attributes, children, element }: any) => {
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'bulleted-list':
      return <ul style={style} {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 style={style} {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 style={style} {...attributes}>{children}</h2>
    case 'list-item':
      return <li style={style} {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol style={style} {...attributes}>{children}</ol>
    default:
      return <p style={style} {...attributes}>{children}</p>
  }
}
interface EditorMarkButton {
  format: "bold" | "italic" | "underline"
  icon: ReactNode | string
}

const MarkButton = ({ format, icon }: EditorMarkButton) => {
  const editor = useSlate()
  return (
    <div
      className={`flex items-center px-1 py-1 border-[1px] cursor-pointer rounded-md
      ${isMarkActive(editor, format) ? "border-charcoal" : "border-desturated-grey"}
      ${isBlockActive(editor, format) ? "border-charcoal" : "border-desturated-grey"}`}

      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      {icon}
    </div>
  )
}

interface EditorBlockButton {
  format: "heading-one" | "heading-two" | "bulleted-list" | "numbered-list" | "list-item"
  icon: ReactNode | string
}

const BlockButton = ({ format, icon }: EditorBlockButton) => {
  const editor = useSlate()
  return (
    <div
      className={` px-1 py-1 border-[1px] cursor-pointer rounded-md
      ${isMarkActive(editor, format) ? "border-charcoal" : "border-desturated-grey"}
      ${isBlockActive(editor, format) ? "border-charcoal" : "border-desturated-grey"}`}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      {icon}
    </div>
  )
}

export const serializeToPlainText = (nodes: Node[]) => {
  return nodes.map((n) => Node.string(n)).join('\n')
}


export const serializeToHTML = (node: any) => {
  console.log(node)
  if (Text.isText(node)) {
    let string = node.text
    if (node.bold) {
      return <strong>{string}</strong>
    }
    if (node.italic) {
      return <em>{string}</em>
    }
    if (node.underline) {
      return <u>{string}</u>
    }
    return string
  }

  const children = node.children.map((n: Node) => serializeToHTML(n))

  switch (node.type) {
    case 'heading-one':
      return <h1>{children}</h1>
    case 'heading-two':
      return <h2>{children}</h2>
    case 'paragraph':
      return <p>{children}</p>
    case 'list-item':
      return <li>{children}</li>
    case 'numbered-list':
      return <ol>{children}</ol>
    case 'bulleted-list':
      return <ul>{children}</ul>
    default:
      return children
  }
}