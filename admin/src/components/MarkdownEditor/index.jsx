import PropTypes from 'prop-types'
import 'codemirror/keymap/sublime'
import 'codemirror/theme/monokai.css'
import CodeMirror from '@uiw/react-codemirror'
import throttle from 'lodash.throttle'
import { wordsCalc } from '@/utils/helper'
import { markdownParser } from '@/utils/markdown'
import { THROTTLE_MD_RENDER_TIME, editorOptions } from '@/utils/constants'
import { useRef, useCallback, useState, useMemo, useImperativeHandle, forwardRef, createRef } from 'react'
import './index.css'


function MarkdownEditor(props) {

  const { initMarkdown, infoRef } = props;

  const [markdown, setMarkdown] = useState(initMarkdown);

  const html = useMemo(
    () => markdownParser.render(markdown),
    [markdown]
  );

  const lines = useMemo(
    () => markdown.split("\n").length,
    [markdown]
  );

  const words = useMemo(
    () => wordsCalc(markdown),
    [markdown]
  );

  useImperativeHandle(
    infoRef,
    () => ({ markdown, html }),
    [markdown, html]
  );

  const onChange = useMemo(
    () => throttle(
      editor => setMarkdown(editor.getValue()),
      THROTTLE_MD_RENDER_TIME
    ),
    []
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

  return (
    <div className="md-editor">
      <div className="editor-body">
        <div
          className="editor-edit"
          onMouseOver={() => scrollAreaRef.current = 1}
        >
          <CodeMirror
            ref={editorRef}
            value={markdown}
            onChange={onChange}
            options={editorOptions}
            onScroll={handleScroll}
          />
        </div>
        <div
          className="editor-preview"
          ref={previewRef}
          onScroll={handleScroll}
          // 采用 mouseover 事件是由于 over事件在 触碰到子元素是也会触发，防止使用 enter 事件为被触发的情况
          onMouseOver={() => scrollAreaRef.current = 2}
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

MarkdownEditor.propTypes = {
  initMarkdown: PropTypes.string
}

MarkdownEditor.defaultProps = {
  initMarkdown: '',
  infoRef: createRef()
}

const MarkdownEditorWrapper = forwardRef((props, ref) => <MarkdownEditor {...props} infoRef={ref} />);

export default MarkdownEditorWrapper

