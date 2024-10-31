import Link from "@/components/link";
import { cn } from "@/lib/cn";

import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import ComponentContainer from "@/components/component-container";
import * as Examples from "@/components/examples";

const components = {
  BasicExample: () => <Examples.Basic />,
  StackedExample: () => <Examples.Stacked />,
  ComponentContainer: ({ children, codeblock }) => <ComponentContainer codeblock={codeblock ? codeblock : undefined}>{children}</ComponentContainer>,
  h2: ({ children, id }) => <h2 id={id}>{children}</h2>,
  a: ({ children, href }) => {
    return (
      <Link href={href} className="inline-flex items-center gap-1 text-muted" underline>
        {children}
      </Link>
    );
  },
  blockquote: ({ className, ...props }) => <blockquote className={cn("mt-6 border-gray-4 border-l-2 pl-6 text-muted", className)} {...props} />,
  table: ({ className, ...props }) => (
    <div className="my-6 w-full overflow-hidden overflow-y-auto">
      <table className={cn("w-full overflow-hidden", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th className={cn("border border-border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right", className)} {...props} />
  ),
  td: ({ className, ...props }) => (
    <td className={cn("border border-border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right", className)} {...props} />
  ),
  ol: ({ className, ...props }) => <ol className={cn("mt-2 ml-2 list-decimal", className)} {...props} />,
  ul: ({ className, ...props }) => <ul className={cn("mt-2 ml-2 list-disc", className)} {...props} />,
  li: ({ className, ...props }) => <li className={cn("mt-2 ml-2 list-item", className)} {...props} />,
};

export function MDX(props) {
  return (
    <MDXRemote
      {...props}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypePrettyCode,
              {
                theme: {
                  dark: "github-dark",
                  light: "github-light",
                },
                keepBackground: false,
                defaultLang: "tsx",
              },
            ],
          ],
        },
      }}
    />
  );
}
