import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-lg max-w-none
      /* Headings */
      prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
      prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-6
      prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-100
      prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
      prose-h4:text-lg prose-h4:mt-8 prose-h4:mb-3

      /* Paragraphs & text */
      prose-p:text-gray-700 prose-p:leading-[1.8]
      prose-strong:text-gray-900 prose-strong:font-semibold

      /* Links */
      prose-a:text-indigo-600 prose-a:no-underline prose-a:font-medium prose-a:decoration-indigo-300 hover:prose-a:underline hover:prose-a:decoration-indigo-400

      /* Inline code */
      prose-code:text-rose-600 prose-code:bg-rose-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-medium prose-code:before:content-none prose-code:after:content-none

      /* Code blocks */
      prose-pre:bg-[#1a1a2e] prose-pre:text-gray-100 prose-pre:rounded-2xl prose-pre:shadow-lg prose-pre:shadow-black/10 prose-pre:border prose-pre:border-white/5 prose-pre:p-0

      /* Images */
      prose-img:rounded-2xl prose-img:shadow-lg prose-img:shadow-black/5 prose-img:mx-auto

      /* Blockquotes */
      prose-blockquote:border-l-indigo-400 prose-blockquote:bg-indigo-50/50 prose-blockquote:py-2 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-blockquote:font-normal

      /* Lists */
      prose-li:text-gray-700 prose-li:marker:text-indigo-300 prose-li:my-1

      /* Tables */
      prose-th:bg-gray-50 prose-th:text-gray-900 prose-th:font-semibold prose-th:px-4 prose-th:py-3 prose-th:text-sm
      prose-td:text-gray-600 prose-td:px-4 prose-td:py-3 prose-td:text-sm
      prose-table:border-separate prose-table:border-spacing-0 prose-table:rounded-xl prose-table:overflow-hidden prose-table:shadow-sm prose-table:border prose-table:border-gray-100

      /* Horizontal rule */
      prose-hr:border-gray-100
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSlug]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
