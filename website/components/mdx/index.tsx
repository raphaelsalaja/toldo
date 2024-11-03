import ComponentContainer from "@/components/component-container";
import * as Examples from "@/components/examples";
import FigCaption from "@/components/figcaption";
import Link from "@/components/link";
import { PropsTable } from "@/components/props-table";
import type { MDXProvider } from "@mdx-js/react";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import type { JSX } from "react";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { H1 } from "../h1";

type PropsTableProps = React.ComponentProps<typeof PropsTable>;
type ComponentContainerProps = React.ComponentProps<typeof ComponentContainer>;
type Heading1Props = React.ComponentProps<typeof H1>;
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type CodeProps = React.ComponentProps<"p">;
type FigCaptionProps = React.ComponentProps<typeof FigCaption>;

const components = {
  PropsTable: (data: PropsTableProps) => <PropsTable {...data} />,
  ShowcaseExample: () => <Examples.Showcase />,
  SharedExample: () => <Examples.Shared />,
  BasicExample: () => <Examples.Basic />,
  StackedExample: () => <Examples.Stacked />,
  ComponentContainer: (props: ComponentContainerProps) => <ComponentContainer {...props} />,
  figcaption: (props: FigCaptionProps) => <FigCaption {...props} />,
  h1: (props: Heading1Props) => <H1 {...props} />,
  a: (props: AnchorProps) => <Link {...props} className="inline-flex items-center gap-1 text-muted" underline />,
  Code: (props: CodeProps) => <span {...props} className="inline-block rounded-md bg-gray-3 px-1 font-mono text-gray-11 text-sm" />,
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
