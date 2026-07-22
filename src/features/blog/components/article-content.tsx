import type { ComponentProps, ReactNode } from "react";
import { isValidElement, useMemo } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import pug from "react-syntax-highlighter/dist/esm/languages/prism/pug";
import scss from "react-syntax-highlighter/dist/esm/languages/prism/scss";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { remarkNormalizeInlineSpacing } from "@/features/blog/lib/remark-normalize-inline-spacing";
import { cn } from "@/lib/utils";

const REMARK_PLUGINS = [remarkGfm, remarkNormalizeInlineSpacing];
const CODE_BLOCK_STYLE = { margin: "1.3rem 0" };
const EMBED_TOKEN_PATTERN = /^\{\{embed:(\d+)\}\}$/;
const LANGUAGE_PATTERN = /language-([\w-]+)/;

/** Chỉ cho phép nhúng từ các host tin cậy, và tất cả đều khác origin của trang. */
const ALLOWED_EMBED_HOSTS = new Set(["viblo.asia", "jsfiddle.net"]);

const LANGUAGE_ALIASES: Record<string, string> = {
  html: "markup",
  js: "javascript",
  npm: "bash",
};

for (const [name, definition] of Object.entries({
  bash,
  css,
  javascript,
  markup,
  pug,
  scss,
})) {
  SyntaxHighlighter.registerLanguage(name, definition);
}

function isAllowedEmbed(source: string): boolean {
  try {
    const { hostname } = new URL(source, window.location.origin);
    return ALLOWED_EMBED_HOSTS.has(hostname);
  } catch {
    return false;
  }
}

function EmbeddedFrame({ source }: { source: string | undefined }) {
  if (!source || !isAllowedEmbed(source)) return null;

  return (
    <iframe
      className="my-6 h-96 w-full rounded border"
      loading="lazy"
      // `allow-same-origin` an toàn ở đây vì allowlist trên chỉ chứa host khác origin.
      sandbox="allow-scripts allow-same-origin"
      src={source}
      title="Ví dụ nhúng"
    />
  );
}

/** Trả về nội dung dạng chuỗi thuần, hoặc null nếu đoạn có phần tử con phức tạp. */
function asPlainText(children: ReactNode): string | null {
  if (typeof children === "string") return children;
  if (
    Array.isArray(children) &&
    children.length === 1 &&
    typeof children[0] === "string"
  ) {
    return children[0];
  }
  return null;
}

function Paragraph({
  children,
  embeds,
  ...props
}: ComponentProps<"p"> & { embeds: string[] }) {
  const text = asPlainText(children);
  const token = text ? EMBED_TOKEN_PATTERN.exec(text) : null;
  if (token) return <EmbeddedFrame source={embeds[Number(token[1])]} />;

  return <p {...props}>{children}</p>;
}

function InlineCode({ children, className, ...props }: ComponentProps<"code">) {
  return (
    <code {...props} className={cn("article-inline-code", className)}>
      {children}
    </code>
  );
}

function ArticleLink({ children, ...props }: ComponentProps<"a">) {
  return (
    <a {...props} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
}

function CodeBlock({ children, ...props }: ComponentProps<"pre">) {
  if (!isValidElement<{ children?: ReactNode; className?: string }>(children)) {
    return <pre {...props}>{children}</pre>;
  }

  const { children: code, className } = children.props;
  const language = LANGUAGE_PATTERN.exec(className ?? "")?.[1];
  if (!language) {
    return (
      <pre {...props} className="article-plain-code-block">
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <SyntaxHighlighter
      className="article-code-block"
      customStyle={CODE_BLOCK_STYLE}
      language={LANGUAGE_ALIASES[language] ?? language}
      style={vscDarkPlus}
    >
      {String(code).replace(/\n$/, "")}
    </SyntaxHighlighter>
  );
}

interface ArticleContentProps {
  body: string;
  embeds: string[];
}

export function ArticleContent({ body, embeds }: ArticleContentProps) {
  const components = useMemo<Components>(
    () => ({
      a: ArticleLink,
      code: InlineCode,
      p: (props) => <Paragraph {...props} embeds={embeds} />,
      pre: CodeBlock,
    }),
    [embeds],
  );

  return (
    <div className="article-content">
      <ReactMarkdown components={components} remarkPlugins={REMARK_PLUGINS}>
        {body}
      </ReactMarkdown>
    </div>
  );
}
