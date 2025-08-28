import { MDXRemote } from 'next-mdx-remote/rsc';
import type React from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  children?: React.ReactNode;
};

type ElementProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: React.ReactNode;
};

type CodeProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
  className?: string;
};

// Custom component types
interface CardProps {
  title?: string;
  href?: string;
  children?: React.ReactNode;
  className?: string;
}

interface CardGroupProps {
  children?: React.ReactNode;
  cols?: number;
}

interface CalloutProps {
  children?: React.ReactNode;
}

interface CardHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children?: React.ReactNode;
  className?: string;
}

interface CardDescriptionProps {
  children?: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children?: React.ReactNode;
  className?: string;
}

// Custom MDX components for documentation
const Card: React.FC<CardProps> = ({ title, href, children, className }) => {
  const content = title ? (
    <>
      <h3 className="mb-2 font-bold">{title}</h3>
      <p className="text-sm">{children}</p>
    </>
  ) : (
    children
  );

  if (href) {
    return (
      <a
        className={cn("mb-4 block border-2 border-black p-4 transition-colors hover:bg-gray-50", className)}
        href={href}
      >
        {content}
      </a>
    );
  }

  return <div className={cn("mb-4 block border-2 border-black p-4", className)}>{content}</div>;
};

const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => (
  <div className={cn("mb-4", className)}>{children}</div>
);

const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => (
  <h3 className={cn("font-bold text-lg mb-2", className)}>{children}</h3>
);

const CardDescription: React.FC<CardDescriptionProps> = ({ children, className }) => (
  <p className={cn("text-sm text-gray-600", className)}>{children}</p>
);

const CardContent: React.FC<CardContentProps> = ({ children, className }) => (
  <div className={cn("", className)}>{children}</div>
);

const CardGroup: React.FC<CardGroupProps> = ({ children, cols = 1 }) => (
  <div
    className="mb-8 grid gap-4"
    style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
  >
    {children}
  </div>
);

const Tip: React.FC<CalloutProps> = ({ children }) => (
  <div className="mb-4 border-blue-500 border-l-4 bg-blue-50 p-4">
    <p className="mb-1 font-semibold">Tip</p>
    {children}
  </div>
);

const Warning: React.FC<CalloutProps> = ({ children }) => (
  <div className="mb-4 border-yellow-500 border-l-4 bg-yellow-50 p-4">
    <p className="mb-1 font-semibold">Warning</p>
    {children}
  </div>
);

const Note: React.FC<CalloutProps> = ({ children }) => (
  <div className="mb-4 border-gray-500 border-l-4 bg-gray-50 p-4">
    <p className="mb-1 font-semibold">Note</p>
    {children}
  </div>
);

// Placeholder components for missing ones
const Accordion: React.FC<any> = ({ children }) => <div className="mb-4">{children}</div>;
const AccordionGroup: React.FC<any> = ({ children }) => <div className="space-y-2">{children}</div>;
const AccordionItem: React.FC<any> = ({ children }) => <div className="border-b">{children}</div>;
const AccordionTrigger: React.FC<any> = ({ children }) => <button type="button" className="w-full py-2 text-left">{children}</button>;
const AccordionContent: React.FC<any> = ({ children }) => <div className="py-2">{children}</div>;
const Button: React.FC<any> = ({ children, ...props }) => <button type="button" className="px-4 py-2 border-2 border-black" {...props}>{children}</button>;
const Tabs: React.FC<any> = ({ children }) => <div className="mb-4">{children}</div>;
const Tab: React.FC<any> = ({ children }) => <div>{children}</div>;
const TabsList: React.FC<any> = ({ children }) => <div className="flex border-b">{children}</div>;
const TabsTrigger: React.FC<any> = ({ children }) => <button type="button" className="px-4 py-2">{children}</button>;
const TabsContent: React.FC<any> = ({ children }) => <div className="py-4">{children}</div>;
const CodeGroup: React.FC<any> = ({ children }) => <div className="mb-4">{children}</div>;
const CodeBlock: React.FC<any> = ({ children }) => <pre className="bg-gray-100 p-4 overflow-x-auto">{children}</pre>;
const Steps: React.FC<any> = ({ children }) => <ol className="list-decimal ml-6 space-y-2">{children}</ol>;
const Step: React.FC<any> = ({ children }) => <li>{children}</li>;
const Info: React.FC<any> = ({ children }) => <div className="border-l-4 border-blue-500 bg-blue-50 p-4 my-4">{children}</div>;
const Check: React.FC<any> = ({ children }) => <div className="border-l-4 border-green-500 bg-green-50 p-4 my-4">{children}</div>;
const Icon: React.FC<any> = ({ children, icon }) => <span>{icon || children}</span>;
const ResponseField: React.FC<any> = ({ children, name, type }) => <div className="mb-2"><strong>{name}</strong> <em>({type})</em>: {children}</div>;
const ParamField: React.FC<any> = ({ children, path, type, required }) => <div className="mb-2"><strong>{path}</strong> <em>({type})</em> {required && '(required)'}: {children}</div>;
const Param: React.FC<any> = ({ children, ...props }) => <ParamField {...props}>{children}</ParamField>;
const RequestExample: React.FC<any> = ({ children }) => <pre className="bg-gray-100 p-4 overflow-x-auto">{children}</pre>;
const ResponseExample: React.FC<any> = ({ children }) => <pre className="bg-gray-100 p-4 overflow-x-auto">{children}</pre>;
// Additional common documentation components
const TryInConsoleButton: React.FC<any> = () => <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded">Try in Console</button>;
const ExpandableCode: React.FC<any> = ({ children }) => <details className="mb-4"><summary className="cursor-pointer">View code</summary>{children}</details>;
const Frame: React.FC<any> = ({ children }) => <div className="border-2 border-gray-300 p-4 mb-4">{children}</div>;
const Snippet: React.FC<any> = ({ children }) => <code className="bg-gray-100 px-2 py-1 rounded">{children}</code>;
const SnippetGroup: React.FC<any> = ({ children }) => <div className="space-y-2 mb-4">{children}</div>;

const components = {
  // Custom components
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardGroup,
  Tip,
  Warning,
  Note,
  Accordion,
  AccordionGroup,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Button,
  Tabs,
  Tab,
  TabsList,
  TabsTrigger,
  TabsContent,
  CodeGroup,
  CodeBlock,
  Steps,
  Step,
  Info,
  Check,
  Icon,
  ResponseField,
  ParamField,
  Param,
  RequestExample,
  ResponseExample,
  TryInConsoleButton,
  ExpandableCode,
  Frame,
  Snippet,
  SnippetGroup,
  // Standard HTML elements
  h1: ({ children, ...props }: HeadingProps) => (
    <h1 className="mt-8 mb-6 font-bold text-3xl lowercase" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: HeadingProps) => (
    <h2 className="mt-6 mb-4 font-bold text-2xl lowercase" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: HeadingProps) => (
    <h3 className="mt-4 mb-3 font-bold text-xl lowercase" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: ElementProps) => (
    <p className="mb-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: ElementProps) => (
    <ul className="mb-4 ml-6 list-disc space-y-1" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ElementProps) => (
    <ol className="mb-4 ml-6 list-decimal space-y-1" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ElementProps) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  code: ({ children, className, ...props }: CodeProps) => {
    const isInline = !className;
    return isInline ? (
      <code
        className="border border-gray-300 bg-gray-100 px-1.5 py-0.5 font-mono text-sm"
        {...props}
      >
        {children}
      </code>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: ElementProps) => (
    <pre
      className="mb-4 overflow-x-auto border-2 border-black bg-gray-100 p-4 font-mono text-sm"
      {...props}
    >
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }: ElementProps) => (
    <blockquote className="mb-4 border-black border-l-4 pl-4 italic" {...props}>
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }: ElementProps) => (
    <div className="mb-4 overflow-x-auto">
      <table className="min-w-full border-2 border-black" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: ElementProps) => (
    <th
      className="border border-black bg-gray-100 px-4 py-2 text-left font-bold"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: ElementProps) => (
    <td className="border border-black px-4 py-2" {...props}>
      {children}
    </td>
  ),
  a: ({ children, href, ...props }: AnchorProps) => (
    <a
      className="underline transition-all hover:no-underline"
      href={href}
      {...props}
    >
      {children}
    </a>
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-black border-t-2" {...props} />
  ),
};

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <MDXRemote
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            // Disabled auto-linking to prevent nested anchor tags
            // [rehypeAutolinkHeadings, { behavior: 'append' }],
            rehypeHighlight,
          ],
        },
      }}
      source={content}
    />
  );
}
