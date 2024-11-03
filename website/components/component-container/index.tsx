import type React from "react";

import styles from "./styles.module.css";

interface ComponentContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  codeblock?: string;
}

export default function ComponentContainer({ children, codeblock }: ComponentContainerProps) {
  return (
    <figure data-with-codeblock={codeblock} className={styles.preview}>
      {children}
    </figure>
  );
}
