
import React, { useEffect, useState } from 'react'
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

const MathComponent = ({ node, updateAttributes }: NodeViewProps) => {
  const [latex, setLatex] = useState(node.attrs.content || '')
  const [isEditing, setIsEditing] = useState(false)
  const [renderedHTML, setRenderedHTML] = useState('')

  useEffect(() => {
    try {
      const html = katex.renderToString(latex || '\\text{Click to edit LaTeX}', {
        throwOnError: false,
        displayMode: true,
      })
      setRenderedHTML(html)
    } catch (error) {
      console.error('KaTeX rendering error:', error)
      setRenderedHTML(`<span style="color: red;">LaTeX Error</span>`)
    }
  }, [latex])

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLatex(event.target.value)
    updateAttributes({ content: event.target.value })
  }

  return (
    <NodeViewWrapper className="math-component">
      {isEditing ? (
        <div className="math-editor p-4 border border-gray-300 rounded bg-gray-50">
          <textarea
            className="w-full p-2 font-mono text-sm border border-gray-300 rounded"
            value={latex}
            onChange={handleChange}
            rows={3}
            autoFocus
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                setIsEditing(false)
              }
            }}
            placeholder="Enter LaTeX here..."
          />
          <div className="mt-2 text-xs text-gray-500">Press Ctrl+Enter to save</div>
        </div>
      ) : (
        <div
          className="math-display p-4 cursor-pointer hover:bg-gray-50 rounded"
          onClick={() => setIsEditing(true)}
          dangerouslySetInnerHTML={{ __html: renderedHTML }}
        />
      )}
    </NodeViewWrapper>
  )
}

export default MathComponent
