import { getDocumentation } from "@/lib/mdx";

import { MDX } from "@/components/mdx";
import toldo from "^/packages/toldo/package.json";
import { notFound } from "next/navigation";
import React from "react";

import clsx from "clsx";

const Documentation = getDocumentation();

export default async function Page() {
  const post = Documentation.find((doc) => doc.slug === "home");

  if (!post) {
    notFound();
  }

  const className = clsx(
    "hover:text-gray-12 hover:opacity-100 hover:before:scale-100 hover:before:bg-gray-4",
    "before:-z-[1] before:absolute before:top-0 before:left-0 before:h-full before:w-full before:scale-75 before:rounded-md before:bg-transparent before:transition-all before:content-['']",
    "relative z-[0] flex h-fit w-fit items-center justify-center gap-2 rounded-md bg-transparent px-1.5 text-muted transition-all",
  );

  return (
    <React.Fragment>
      <div className="flex flex-col">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-0 font-medium">
            <div>Toldo</div>
          </div>
          <div className="flex gap-2 text-muted">
            <a
              href="https://github.com/raphaelsalaja/toldo"
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              Github
            </a>
            ―
            <a href="https://x.com/raphaelsalaja" target="_blank" rel="noopener noreferrer" className={className}>
              Twitter
            </a>
            ―
            <a
              href="https://www.npmjs.com/package/toldo"
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {toldo.version}
            </a>
          </div>
        </div>
      </div>
      <MDX source={post.content} />
    </React.Fragment>
  );
}
