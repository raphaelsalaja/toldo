import type { Post } from "@/types";

import { getDocumentation } from "@/lib/mdx";
import { OpenGraph } from "@/lib/og";
import { MDX } from "@/mdx-components";

import { notFound } from "next/navigation";
import React from "react";

const Documentation = getDocumentation();

interface PageProps {
  params: Promise<Post>;
}

export async function generateStaticParams() {
  return Documentation.map((document) => ({
    slug: document.slug,
  }));
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const document = Documentation.find((post: { slug: string }) => post.slug === params.slug);
  const title = document ? document.title : "";
  const image = `${process.env.NEXT_PUBLIC_SITE_URL}api/og?title=${encodeURIComponent(title)}`;

  return {
    ...OpenGraph,
    title,
    openGraph: {
      title,
      images: [image],
    },
    twitter: {
      images: [image],
    },
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  const post = Documentation.find((post: { slug: string }) => post.slug === params.slug);

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
        <div className="mt-1 flex gap-2 text-muted text-small">
          {/* <PublishedTime />
          <Seperator />
          <UpdateTime />
          <Seperator />
          <ReadingTime /> */}
        </div>
      </div>

      <MDX source={post.content} />
    </React.Fragment>
  );
}
