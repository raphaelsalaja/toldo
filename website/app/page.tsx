import type { Post } from "@/types/post";

import { getDocumentation } from "@/lib/mdx";

import { MDX } from "@/components/mdx";
import { notFound } from "next/navigation";
import React from "react";

const Documentation = getDocumentation();

interface PageProps {
  params: Promise<Post>;
}

export default async function Page() {

  const post = Documentation.find((doc) => doc.slug === "home");

  if (!post) {
    notFound();
  }

  return (
    <React.Fragment>
      <div className="flex flex-col">
        <div>
          <h1>{post.title}</h1>
          <h2>{post.summary}</h2>
        </div>
      </div>

      <MDX source={post.content} />
    </React.Fragment>
  );
}
