import MarkdownIt from 'markdown-it'
import highlightjs from 'highlight.js'

const markdownParser = new MarkdownIt({
  html: true,
  highlight: (str, lang) => {
    if (lang === undefined || lang === "") {
      lang = "bash";
    }
    // 加上custom则表示自定义样式，而非微信专属，避免被remove pre
    if (lang && highlightjs.getLanguage(lang)) {
      try {
        const formatted = highlightjs
          .highlight(str, { language: lang, ignoreIllegals: true })
          .value.replace(/\n/g, "<br/>") // 换行用br表示
          .replace(/\s/g, "&nbsp;") // 用nbsp替换空格
          .replace(/span&nbsp;/g, "span "); // span标签修复
        return '<pre class="custom"><code class="hljs">' + formatted + "</code></pre>";
      } catch (e) {
        console.log(e);
      }
    }
    return '<pre class="custom"><code class="hljs">' + markdownParser.utils.escapeHtml(str) + "</code></pre>";
  },
});

export { markdownParser }