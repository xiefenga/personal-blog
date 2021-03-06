import 'codemirror/keymap/sublime'
import 'codemirror/theme/monokai.css'
import CodeMirror from '@uiw/react-codemirror'
import throttle from 'lodash.throttle'
import { wordsCount } from '@/utils/helper'
import { useMarkdown } from '@/hooks/store'
import { markdownParser } from '@/utils/markdown'
import { useRef, useCallback, useMemo } from 'react'
import { THROTTLE_MD_RENDER_TIME, EDITOR_OPTIONS } from '@/utils/constants'
import './index.css'


function MarkdownEditor() {

  const [markdown, setMarkdown] = useMarkdown();

  const html = useMemo(
    () => markdownParser.render(markdown),
    [markdown]
  );

  const lines = useMemo(
    () => markdown.split("\n").length,
    [markdown]
  );

  const words = useMemo(
    () => wordsCount(markdown),
    [markdown]
  );

  // change 事件 通过输入和 value 的改变都会触发
  const onChange = useMemo(
    () => throttle(
      // 通过 focus 来判断是 通过输入触发 change 事件还是 通过 value 触发
      editor => editor.hasFocus() && setMarkdown(editor.getValue()),
      THROTTLE_MD_RENDER_TIME
    ),
    [setMarkdown]
  );

  // 用于得到编辑器实例
  const editorRef = useRef(null);

  // 用于得到预览区域的 DOM 实例
  const previewRef = useRef(null);

  // 用于标识正在 scroll 的区域，1 表示编辑器，2 表示预览区域
  const scrollAreaRef = useRef(1);

  const handleScroll = useCallback(
    () => {
      const { editor } = editorRef.current;

      const preview = previewRef.current;

      // scrollInfo -> { left, top, width, height, clientWidth, clientHeight }
      const scrollInfo = editor.getScrollInfo();

      // height 整个编辑器内容的高度，clientHeight 显示区域的高度 top 相当于 scrollTop
      //  scale = editorToTop / editorScrollHeight;
      const editorToTop = scrollInfo.top;
      const editorScrollHeight = scrollInfo.height - scrollInfo.clientHeight;


      // scrollHeightt 是整个容器内容的高度，包括顶部的 padding
      // clientHeight 为整个容器的可是区的高度，包括上下 padding 不包括 border
      //  scale = preview.scrollTop / (preview.scrollHeight - preview.clientHeight);

      if (scrollAreaRef.current === 1) {
        const scale = editorToTop / editorScrollHeight;
        preview.scrollTop = scale * (preview.scrollHeight - preview.clientHeight);
      } else {
        const scale = preview.scrollTop / (preview.scrollHeight - preview.clientHeight);
        editor.scrollTo(null, scale * editorScrollHeight);
      }
    },
    []
  );

  const move2Editor = useCallback(
    () => scrollAreaRef.current = 1,
    []
  );

  const move2Preview = useCallback(
    () => scrollAreaRef.current = 2,
    []
  );

  return (
    <div className="md-editor">
      <div className="editor-body">
        <div
          className="editor-edit"
          onMouseOver={move2Editor}
        >
          <CodeMirror
            ref={editorRef}
            value={markdown}
            onChange={onChange}
            options={EDITOR_OPTIONS}
            onScroll={handleScroll}
          />
        </div>
        <div
          className="editor-preview"
          ref={previewRef}
          onScroll={handleScroll}
          // 采用 mouseover 事件是由于 over事件在 触碰到子元素是也会触发，防止使用 enter 事件为被触发的情况
          onMouseOver={move2Preview}
        >
          <article id="article-content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
      <div className="editor-footer">
        <span>行数：{lines}</span>
        <span>字数：{words}</span>
      </div>
    </div>
  )
}

export default MarkdownEditor

