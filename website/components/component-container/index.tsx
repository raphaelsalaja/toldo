import type React from "react";

import styles from "./styles.module.css";

export default function ComponentContainer({ children, codeblock }: React.HTMLAttributes<HTMLDivElement> & { codeblock?: string }) {
  return (
    <figure data-with-codeblock={codeblock} className={styles.preview}>
      {children}
    </figure>
  );
}
