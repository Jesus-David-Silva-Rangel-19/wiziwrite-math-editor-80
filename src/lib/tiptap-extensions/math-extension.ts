
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import MathComponent from '@/components/editor/MathComponent'

export const Math = Node.create({
  name: 'math',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      content: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'math-component',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['math-component', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(MathComponent)
  },
})

export default Math
