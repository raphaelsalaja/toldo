import { APITable } from "@/components/api-table";
import ComponentContainer from "@/components/component-container";
import * as Examples from "@/components/examples";
import FigCaption from "@/components/figcaption";
import Link from "@/components/link";
import type { MDXProvider } from "@mdx-js/react";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import type { JSX } from "react";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";

type APITableProps = React.ComponentProps<typeof APITable>;
type ComponentContainerProps = React.ComponentProps<typeof ComponentContainer>;
type Heading2Props = React.HTMLAttributes<HTMLHeadingElement>;
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type CodeProps = React.ComponentProps<"p">;
type FigCaptionProps = React.ComponentProps<typeof FigCaption>;

const components = {
  APITable: (data: APITableProps) => <APITable {...data} />,
  BasicExample: () => <Examples.Basic />,
  StackedExample: () => <Examples.Stacked />,
  ShowcaseExample: () => <Examples.Showcase />,
  SharedAnimationExample: () => <Examples.SharedAnimation />,
  ComponentContainer: (props: ComponentContainerProps) => <ComponentContainer {...props} />,
  figcaption: (props: FigCaptionProps) => <FigCaption {...props} />,
  h2: ({ ...props }: Heading2Props) => <h2 {...props} />,
  a: (props: AnchorProps) => <Link {...props} className="inline-flex items-center gap-1 text-muted" underline />,
  Code: (props: CodeProps) => <span {...props} className="bg-gray-3 text-gray-11 rounded-md px-1 text-sm font-mono  inline-block" />,
};

export function MDX(props: JSX.IntrinsicAttributes & MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={components as React.ComponentProps<typeof MDXProvider>["components"]}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            remarkParse,
            rehypeSlug,
            [
              rehypePrettyCode,
              {
                bypassInlineCode: true,
                theme: {
                  dark: "github-dark",
                  light: "github-light",
                },
                keepBackground: false,
                defaultLang: "tsx",
              },
            ],
            rehypeStringify,
          ],
        },
      }}
    />
  );
}
