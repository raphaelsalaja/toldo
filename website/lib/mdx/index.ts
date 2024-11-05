import type { Post } from "@/types/post";

import fs from "fs";
import path from "path";

import matter from "gray-matter";

function readFile(filePath: string): Post | null {
  try {
    const rawContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(rawContent);

    return {
      ...data,
      slug: path.basename(filePath, ".mdx"),
      content,
    } as Post;
  } catch (error) {
    console.error(`Failed to read or parse the file at ${filePath}:`, error);
    return null;
  }
}

function getFiles(dir: string): string[] {
  try {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
  } catch (error) {
    console.error(`Failed to read directory at ${dir}:`, error);
    return [];
  }
}

export function getDocumentation(): Post[] {
  const files = getFiles(path.join(process.cwd(), "mdx"));

  // get the file named home
  return files
    .map((file) => readFile(path.join(process.cwd(), "mdx", file)))
    .filter((post): post is Post => post !== null);
}
