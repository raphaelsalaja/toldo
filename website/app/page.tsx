import { getDocumentation } from "@/lib/mdx";

import { MDX } from "@/components/mdx";
import { OnThisPage } from "@/components/on-this-page";
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
    "hover:before:scale-100 hover:before:bg-gray-4 hover:text-gray-12 hover:opacity-100",
    "before:absolute before:top-0 before:left-0 before:-z-10 before:w-full before:h-full before:bg-transparent before:rounded-md before:scale-75 before:content-[''] before:transition-all",
    "relative w-fit h-fit px-1.5 flex items-center justify-center rounded-md z-10 bg-transparent transition-all text-muted gap-2",
  );

  return (
    <React.Fragment>
      <OnThisPage />
      <div className="flex flex-col">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-0">
            <div>Toldo</div>
          </div>
          <div className="flex gap-2 text-muted">
            <a href="https://github.com/raphaelsalaja/toldo" target="_blank" rel="noopener noreferrer" className={className}>
              Github
            </a>
            ―
            <a href="https://x.com/raphaelsalaja" target="_blank" rel="noopener noreferrer" className={className}>
              Twitter
            </a>
            ―
            <a href="https://www.npmjs.com/package/toldo" target="_blank" rel="noopener noreferrer" className={className}>
              {toldo.version}
            </a>
          </div>
        </div>
      </div>
      <MDX source={post.content} />
    </React.Fragment>
  );
}
